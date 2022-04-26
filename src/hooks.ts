import { IBuildResult, IBuildTaskOption } from "../@types/packages/builder/@types";
import { createManifestFile } from "./make-manifest";

export function onBeforeBuild(options: any) {
    // console.log('onAfterBuild ',options)
}
export function onAfterBuild(options: IBuildTaskOption, result: any): Promise<void> | void {
    // console.log('onAfterBuild options', options)
    let be = options.packages!['build-extension'];
    let a = {
        buildPath: options.buildPath,
        platform: options.platform,
        packageName: options.packages![options.platform].packageName || be.packageName,
        hotUpdataServerUrl: be.remoteAddress,
        baseVersion: be.baseVersion,
        makeZip: be.makeZip
    };
    Editor.Message.send('build-extension', 'createManifestFile', JSON.stringify(a));
    // createManifestFile(a);
}