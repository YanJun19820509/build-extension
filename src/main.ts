//@ts-ignore
import { compressImages } from "./compress";
import { createManifestFile } from "./make-manifest";
/**
 * @en 
 * @zh 为扩展的主进程的注册方法
 */
export const methods: { [key: string]: (...any: any) => any } = {
    createHotupdateAssets(v) {
        // console.log(v);
        var args = JSON.parse(v);
        if (args.compress) {
            compressImages(args);
        }
        createManifestFile(args);
    },
};

/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
export const load = function () { };

/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
export const unload = function () { };
