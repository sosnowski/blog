provider "aws" {
  profile = "default"
  region  = "us-east-1"
  alias   = "aws-us-east-1"
}

provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

resource "aws_s3_bucket" "blog_bucket" {
  provider      = aws.aws-us-east-1
  bucket        = "sosnowski-blog-files"
  acl           = "private"
  force_destroy = true

  tags = {
    App = "blog"
  }
}

resource "aws_s3_bucket" "blog_logs" {
  provider      = aws.aws-us-east-1
  bucket        = "sosnowski-blog-logs"
  acl           = "private"
  force_destroy = true

  tags = {
    App = "blog"
  }
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment  = "cloudfront origin access identity"
  provider = aws.aws-us-east-1
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.blog_bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = ["${aws_s3_bucket.blog_bucket.arn}"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"]
    }
  }
}

resource "aws_s3_bucket_policy" "example" {
  bucket = aws_s3_bucket.blog_bucket.id
  policy = data.aws_iam_policy_document.s3_policy.json
}


resource "aws_cloudfront_distribution" "blog_assets_distribution" {
  provider = aws.aws-us-east-1
  origin {
    domain_name = aws_s3_bucket.blog_bucket.bucket_domain_name
    # just some unique ID of the origin
    origin_id = "s3_blog_assets_origin"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  comment             = ""
  default_root_object = "index.html"
  price_class         = "PriceClass_100"

  aliases = ["cdn.sosnowski.dev"]

  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:us-east-1:273063963518:certificate/4631844b-767f-4f65-b2bf-d18a16d20bae"
    ssl_support_method  = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }


  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.blog_logs.bucket_domain_name
    prefix          = "cloudfront_logs/"
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3_blog_assets_origin"
    compress         = true
    forwarded_values {
      query_string            = true
      query_string_cache_keys = ["v"]
      cookies {
        forward = "none"
      }
    }
    viewer_protocol_policy = "redirect-to-https"

    lambda_function_association {
      event_type   = "origin-request"
      lambda_arn   = aws_lambda_function.cdn-origin-request-lambda.qualified_arn
      include_body = false
    }

    # 12h
    default_ttl = 0
  }

  ordered_cache_behavior {
    path_pattern     = "/assets/*"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3_blog_assets_origin"
    compress         = false
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    viewer_protocol_policy = "redirect-to-https"

    # 24h 86400
    default_ttl = 0
  }

  tags = {
    App = "blog"
  }
}

# CDN Lambda


data "archive_file" "cdn-origin-request-zip" {
  type        = "zip"
  source_file = "dist/cdn-origin-request/handler.js"
  output_path = "dist/cdn-origin-request.zip"
}

# brakuje roli jeszcze https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-permissions.html

resource "aws_cloudwatch_log_group" "example" {
  provider          = aws.aws-us-east-1
  name              = "/aws/lambda/cdn-origin-request"
  retention_in_days = 14
}

resource "aws_iam_role_policy" "cdn-lambda-execution" {
  provider    = aws.aws-us-east-1
  name_prefix = "lambda-execution-policy-"
  role        = aws_iam_role.cdn-lambda-execution.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:CreateLogGroup"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_role" "cdn-lambda-execution" {
  provider           = aws.aws-us-east-1
  name_prefix        = "lambda-execution-role-"
  description        = "Managed by Terraform"
  assume_role_policy = <<EOF
{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Effect": "Allow",
         "Principal": {
            "Service": [
               "lambda.amazonaws.com",
               "edgelambda.amazonaws.com"
            ]
         },
         "Action": "sts:AssumeRole"
      }
   ]
}
EOF

  tags = {
    App = "blog"
  }
}


resource "aws_lambda_function" "cdn-origin-request-lambda" {
  provider         = aws.aws-us-east-1
  filename         = "dist/cdn-origin-request.zip"
  function_name    = "cdn-origin-request"
  role             = aws_iam_role.cdn-lambda-execution.arn
  handler          = "handler.handler"
  source_code_hash = data.archive_file.cdn-origin-request-zip.output_base64sha256
  runtime          = "nodejs12.x"
  publish          = true
  tags = {
    App = "blog"
  }
}

output "lambda_arn" {
    value = aws_lambda_function.cdn-origin-request-lambda.arn
}

output "lambda_full_ar" {
    value = aws_lambda_function.cdn-origin-request-lambda.qualified_arn
}

output "lambda_version" {
    value = aws_lambda_function.cdn-origin-request-lambda.version
}