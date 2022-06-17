import { execFileSync } from "child_process";
import P from 'path';

export function getVersion(): string {
    console.log('获取svn 版本号:');
    var root = Editor.Project.path;
    var bat = P.join(Editor.Package.getPath('build-extension'), 'svn_info.bat');
    var out = execFileSync(bat, [root], { encoding: 'utf8' });
    out = out.substring(out.indexOf('Last Changed Rev: '), out.indexOf('Last Changed Date')).replace('Last Changed Rev: ', '').replace('\r\n', '');
    console.log('Last Changed Rev', out);
    return out;
}