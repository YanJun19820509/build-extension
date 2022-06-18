import { BuildPlugin } from "../@types/packages/builder/@types";

export const configs: BuildPlugin.Configs = {
    'android': {
        hooks: './hooks.js',
        options: {
            remoteAddress: {
                label: 'Remote URL:',
                render: {
                    ui: 'ui-input',
                    attributes: {
                        placeholder: 'Enter remote address...',
                    },
                },
                // 校验规则，目前内置了几种常用的校验规则，需要自定义的规则可以在 "verifyRuleMap" 字段中配置
                verifyRules: ['http'],
                type: 'object'
            },
            baseVersion: {
                label: 'Base Version:',
                default: '1.0.0',
                render: {
                    // 请点击编辑器菜单栏中的“开发者 -> UI 组件”，查看所有支持的 UI 组件列表。
                    ui: 'ui-input',
                    attributes: {
                        placeholder: 'Enter base version...',
                    },
                },
                verifyRules: ['versionFormatCheck'],
                type: 'object'
            },
            makeZip: {
                label: 'Make zip:',
                render: {
                    // 请点击编辑器菜单栏中的“开发者 -> UI 组件”，查看所有支持的 UI 组件列表。
                    ui: 'ui-checkbox',
                    attributes: {
                        value: false
                    },
                },
                verifyRules: [],
                type: 'object'
            },
            compress: {
                label: 'Compress Images:',
                render: {
                    ui: 'ui-checkbox',
                    attributes: {
                        value: false
                    },
                },
                verifyRules: [],
                type: 'object'
            },
            buildApk: {
                label: 'Build Apk:',
                render: {
                    ui: 'ui-checkbox',
                    attributes: {
                        value: true,
                    },
                },
                verifyRules: [],
                type: 'object'
            },
            flavors: {
                label: 'Product Flavors:',
                render: {
                    ui: 'ui-input',
                    attributes: {
                        placeholder: '输入渠道名，用[,]分割',
                    },
                },
                verifyRules: [],
                type: 'object'
            },
            buildFlaverIdx: {
                label: 'Build Flavor Index:',
                render: {
                    ui: 'ui-input',
                    attributes: {
                        placeholder: '输入需要构建的渠道名下标',
                    },
                },
                verifyRules: [],
                type: 'object'
            },
            buildDebug: {
                label: 'Build For Debug:',
                render: {
                    ui: 'ui-checkbox',
                    attributes: {
                        value: true,
                        tooltip: '勾选打debug包，否则打release包'
                    },
                },
                verifyRules: [],
                type: 'object'
            },
            output: {
                label: 'App/Apk Output Folder:',
                render: {
                    ui: 'ui-input',
                    attributes: {
                        placeholder: '输入原生包导出目录',
                    },
                },
                verifyRules: [],
                type: 'object'
            },
        },
        verifyRuleMap: {
            versionFormatCheck: {
                message: 'version format is not right!',
                func(val: string, option) {
                    let a = val.split('.');
                    let b = true;
                    a.forEach(aa => {
                        if (Number(aa) == NaN) b = false;
                    });
                    return b;
                }
            }
        }
    },
    "web-mobile": {
        hooks: './hooks.js',
        options: {
            packageName: {
                label: 'Package Name:',
                render: {
                    ui: 'ui-input',
                    attributes: {
                        placeholder: 'Enter package name...',
                    },
                },
                // 校验规则，目前内置了几种常用的校验规则，需要自定义的规则可以在 "verifyRuleMap" 字段中配置
                verifyRules: [],
                type: 'object'
            },
            baseVersion: {
                label: 'Base Version:',
                default: '1.0.0',
                render: {
                    // 请点击编辑器菜单栏中的“开发者 -> UI 组件”，查看所有支持的 UI 组件列表。
                    ui: 'ui-input',
                    attributes: {
                        placeholder: 'Enter base version...',
                    },
                },
                verifyRules: ['versionFormatCheck'],
                type: 'object'
            },
            makeZip: {
                label: 'Make zip:',
                render: {
                    // 请点击编辑器菜单栏中的“开发者 -> UI 组件”，查看所有支持的 UI 组件列表。
                    ui: 'ui-checkbox',
                    attributes: {
                        value: false
                    },
                },
                verifyRules: [],
                type: 'object'
            },
            compress: {
                label: 'Compress Images:',
                render: {
                    ui: 'ui-checkbox',
                    attributes: {
                        value: false
                    },
                },
                verifyRules: [],
                type: 'object'
            },
        },
        verifyRuleMap: {
            versionFormatCheck: {
                message: 'version format is not right!',
                func(val: string, option) {
                    let a = val.split('.');
                    let b = true;
                    a.forEach(aa => {
                        if (Number(aa) == NaN) b = false;
                    });
                    return b;
                }
            }
        }
    },
    "web-desktop": {
        hooks: './hooks.js',
        options: {
            packageName: {
                label: 'Package Name:',
                render: {
                    ui: 'ui-input',
                    attributes: {
                        placeholder: 'Enter package name...',
                    },
                },
                // 校验规则，目前内置了几种常用的校验规则，需要自定义的规则可以在 "verifyRuleMap" 字段中配置
                verifyRules: [],
                type: 'object'
            },
            baseVersion: {
                label: 'Base Version:',
                default: '1.0.0',
                render: {
                    // 请点击编辑器菜单栏中的“开发者 -> UI 组件”，查看所有支持的 UI 组件列表。
                    ui: 'ui-input',
                    attributes: {
                        placeholder: 'Enter base version...',
                    },
                },
                verifyRules: ['versionFormatCheck'],
                type: 'object'
            },
            makeZip: {
                label: 'Make zip:',
                render: {
                    ui: 'ui-checkbox',
                    attributes: {
                        value: false
                    },
                },
                verifyRules: [],
                type: 'object'
            },
            compress: {
                label: 'Compress Images:',
                render: {
                    ui: 'ui-checkbox',
                    attributes: {
                        value: false
                    },
                },
                verifyRules: [],
                type: 'object'
            },
        },
        verifyRuleMap: {
            versionFormatCheck: {
                message: 'version format is not right!',
                func(val: string, option) {
                    let a = val.split('.');
                    let b = true;
                    a.forEach(aa => {
                        if (Number(aa) == NaN) b = false;
                    });
                    return b;
                }
            }
        }
    }
};