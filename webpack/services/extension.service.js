const resolve = require('path').resolve;
const pathSeperator = require('path').sep;
const fs = require('fs');

class ExtensionService {

    constructor() {
        this._extensionName = null;
        this._packageData   = null;
        this._rootDirectory = process.cwd();
        this._outDirectory  = process.cwd();
        this._extOutDir     = process.cwd();
    }

    set rootDir(path) {
        this._rootDirectory = path;
    }

    set outDir(path) {
        this._outDirectory = path;
    }

    get outDir() {
        return this._outDirectory;
    }

    set extOutDir(path) {
        this._extOutDir = path;
    }

    get extOutDir() {
        return this._extOutDir;
    }

    get extensionName() {
        if (!this._extensionName) {
            this._extensionName = this.packageData.name;
        }
        return this._extensionName;
    }

    get packageData() {
        if (!this._packageData) {
            const pkgJson = resolve(this._rootDirectory, './package.json');
            this._packageData = JSON.parse(fs.readFileSync(pkgJson, {encoding: "utf8"}));
        }
        return this._packageData;
    }

    get qextFileData() {
        const pkgData = this.packageData;

        /** merge default qext data with, qext section from package.json */
        return Object.assign({
            "author": pkgData.author || "",
            "dependencies": {
                "qlik-sense": ""
            },
            "description": pkgData.description || "", 
            "icon": "",
            "license": pkgData.license || "",
            "name": pkgData.name,
            "repository": pkgData.repository ? pkgData.repository.url : "",
            "type": "visualization",
            "version": pkgData.version,
        }, pkgData.qext);
    }

    /** create qext file */
    createQextFile() {
        const filePath = resolve(this.extOutDir, `${this.extensionName}.qext` );
        /** we require default qext values here */
        fs.writeFileSync(filePath, JSON.stringify(this.qextFileData, null, 4), { encoding: "utf8" });
    }

    /** create wbfolder file */
    createWbFolderFile() {
        const filePath = resolve(this.extOutDir, `wbfolder.wbl`);
        fs.writeFileSync(filePath, "", { encoding: "utf8" });
    }

    /** create extension directory */
    createDistFolder() {
        const paths = this.extOutDir.split(pathSeperator);
        let fullPath = "";
        paths.forEach((partial) => {
            if (fullPath === "") {
                fullPath = partial;
            } else {
                fullPath = [fullPath, partial].join(pathSeperator);
            }

            try {
                if (!fs.existsSync(fullPath)) {
                    fs.mkdirSync(fullPath);
                }
            } catch (error) {
                process.stderr.write(`Could not create Directory: ${fullPath}`);
            }
        });
    }
}

let instance;
module.exports = {
    getInstance: () => {
        if (!instance) {
            instance = new ExtensionService();
        }
        return instance;
    }
}