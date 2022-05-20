import { readdirSync, statSync } from "fs";
import { execFileSync } from "child_process";
import P from 'path';

export function compressImages(args: any) {
    var root = Editor.Project.path + '/';
    var buildPathRoot = args.buildPath.replace('project://', root);
    var dir = P.join(buildPathRoot, args.platform, 'assets/assets');
    searchDir(dir);
}

function searchDir(dir: string) {
    let paths = readdirSync(dir);
    paths.forEach(path => {
        let pa = P.join(dir, path);
        let s = statSync(pa);
        if (s.isDirectory()) searchDir(pa);
        else if (P.extname(path) == '.png') {
            compression(pa);
        }
    });
}

function compression(file: string) {
    try {
        execFileSync('G:\\pngquant\\compress.bat', [file], { encoding: 'utf8' });
    } catch (e) {
        console.log(e);
    }
    console.log('compressed:', file);
}