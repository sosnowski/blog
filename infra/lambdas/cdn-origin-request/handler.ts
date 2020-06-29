import { CloudFrontRequestEvent } from "aws-lambda";

const isPost = /^\/post(.+)/;
const hasExtension = /(.+)\.[a-zA-Z0-9]{2,5}$/;


export const handler = async (event: CloudFrontRequestEvent, context: unknown) => {
    const request = event.Records[0].cf.request;
    console.log(`Lambda@Edge Request URL: ${request.uri}`);
    const url: string = request.uri;

    if (url && url.match(isPost) && !url.match(hasExtension)) {
        request.uri = `${url}.html`;
        console.log(`Change URI to: ${request.uri}`);
    }

    return request;
}