import { execFileSync } from 'child_process';
import { createWriteStream, mkdirSync, readdirSync, readFile, readFileSync, statSync, writeFile } from 'fs';
import path from 'path';
import { getVersion } from './getSvnRevision';

var crypto = require('crypto');

export function createManifestFile(args: any) {
    var svnRevision = getVersion();
    var version = args.baseVersion + '.' + svnRevision;
    var root = Editor.Project.path + '/';
    var buildPathRoot = args.buildPath.replace('project://', root);
    if (args.platform == 'web-mobile' || args.platform == 'web-desktop') {
        // console.log(target);
        args.makeZip && makeWebZipper(buildPathRoot, args.platform, args.packageName, version);
        return;
    }
    var buildPath = path.join(buildPathRoot, args.platform);
    var url = path.join(buildPath, 'assets', "main.js");
    var extFile = path.join(Editor.Package.getPath('build-extension'), 'src/ext.js');
    var ext = readFileSync(extFile, "utf-8");
    readFile(url, "utf-8", function (err, data) {
        if (err) {
            throw err;
        }

        var newStr = ext + "\n";
        newStr += "localStorage.setItem('packageName', '" + args.packageName + "');\n";
        newStr += data;
        writeFile(url, newStr, function (error) {
            if (error) {
                throw error;
            }
            console.log("SearchPath updated in built main.js for hot update");
        });
    });
    makeManifest(buildPath, args.hotUpdataServerUrl, version);
    args.makeZip && makeZipper(buildPath, args.packageName, version);
    if (args.buildApk) buildApk(buildPath, args.flavors.split(',')[args.buildFlaverIdx], args.buildDebug);
}

function makeManifest(buildPath: string, remoteUrl: string, version: string) {

    var manifest: any = {
        packageUrl: 'http://localhost/tutorial-hot-update/remote-assets/',
        remoteManifestUrl: 'http://localhost/tutorial-hot-update/remote-assets/project.manifest',
        remoteVersionUrl: 'http://localhost/tutorial-hot-update/remote-assets/version.manifest',
        version: version,
        assets: {},
        searchPaths: []
    };

    var aa = '';
    if (remoteUrl[remoteUrl.length - 1] != '/') aa = '/';
    manifest.packageUrl = remoteUrl;
    manifest.remoteManifestUrl = remoteUrl + aa + 'assets/project.manifest';
    manifest.remoteVersionUrl = remoteUrl + aa + 'assets/version.manifest';
    var src = path.join(buildPath, 'assets');

    // Iterate assets and src folder
    readDir(src, path.join(src, 'src'), manifest.assets);
    readDir(src, path.join(src, 'assets'), manifest.assets);

    var destManifest = path.join(src, 'assets/project.manifest');
    var destVersion = path.join(src, 'assets/version.manifest');

    writeFile(destManifest, JSON.stringify(manifest), (err) => {
        if (err) throw err;
        console.log('Manifest successfully generated');
    });

    delete manifest.assets;
    delete manifest.searchPaths;
    writeFile(destVersion, JSON.stringify(manifest), (err) => {
        if (err) throw err;
        console.log('Version successfully generated');
    });
}


function readDir(src: string, dir: string, obj: any) {
    var stat = statSync(dir);
    if (!stat.isDirectory()) {
        return;
    }
    var subpaths = readdirSync(dir),
        subpath, size, md5, compressed, relative;
    for (var i = 0; i < subpaths.length; ++i) {
        if (subpaths[i][0] === '.') {
            continue;
        }
        subpath = path.join(dir, subpaths[i]);
        stat = statSync(subpath);
        if (stat.isDirectory()) {
            readDir(src, subpath, obj);
        } else if (stat.isFile()) {
            // Size in Bytes
            size = stat['size'];
            md5 = crypto.createHash('md5').update(readFileSync(subpath)).digest('hex');
            compressed = path.extname(subpath).toLowerCase() === '.zip';

            relative = path.relative(src, subpath);
            relative = relative.replace(/\\/g, '/');
            relative = encodeURI(relative);
            obj[relative] = {
                'size': size,
                'md5': md5
            };
            if (compressed) {
                obj[relative].compressed = true;
            }
        }
    }
}

function mkdir(path: string) {
    try {
        mkdirSync(path);
    } catch (e: any) {
        if (e.code != 'EEXIST') throw e;
    }
}

function makeZipper(buildpath: string, name: string, ver: string) {
    console.log('热更文件打包开始');

    var archiver = require('archiver');
    var root = buildpath + '/',
        res = path.join(buildpath, 'assets', 'assets'),
        src = path.join(buildpath, 'assets', 'src');

    var zipname = name + '_' + ver + '.zip';
    var zipPath = root + zipname;
    var output = createWriteStream(zipPath);
    var archive = archiver('zip', {
        zlib: {
            level: 9
        }
    });
    output.on('close', function () {
        zipPath = zipPath.replace(/\\/g, '/').replace(/\//g, '\\');
        console.log('热更文件打包完成：' + zipPath);
        var exec = require('child_process').exec;
        exec(`explorer.exe /select,"${zipPath}"`);
    });
    archive.pipe(output);
    archive.directory(res, 'assets');
    archive.directory(src, 'src');
    archive.finalize();
}

function makeWebZipper(buildpath: string, platform: string, packageName: string, ver: string) {
    console.log('web文件打包开始');
    var src = path.join(buildpath, platform);
    var archiver = require('archiver');

    var zipname = packageName + '_' + ver + '.zip';
    var zipPath = buildpath + '/' + zipname;
    var output = createWriteStream(zipPath);
    var archive = archiver('zip', {
        zlib: {
            level: 9
        }
    });
    output.on('close', function () {
        zipPath = zipPath.replace(/\\/g, '/').replace(/\//g, '\\');
        console.log('web文件打包完成：' + zipPath);
        var exec = require('child_process').exec;
        exec(`explorer.exe /select,"${zipPath}"`);
    });
    archive.pipe(output);
    archive.directory(src, packageName + '_' + ver);
    archive.finalize();
}

function buildApk(buildPath: string, flavor: string, isDebug: boolean) {
    let a = `assemble${flavor}${isDebug ? 'Debug' : 'Release'}`;
    console.log(`开始构建：${a}`)
    let b = buildPath.split(':')[0] + ':';
    let proj = path.join(buildPath, 'proj');
    var bat = path.join(Editor.Package.getPath('build-extension'), 'build.bat');
    execFileSync(bat, [b, proj, a], { encoding: 'utf8' });
    console.log(`构建完成`)
}