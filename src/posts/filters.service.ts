import { Injectable } from "@nestjs/common";
const sharp = require('sharp');

@Injectable()
export class FiltersService{
    private readonly sepiaConfig = [
        [0.3588, 0.7044, 0.1368], 
        [0.2990, 0.5870, 0.1140], 
        [0.2392, 0.4696, 0.0912]
    ];

    private readonly dir = 'src/posts/photoStorage/';

    async sepia(path: string){
        await sharp(path)
            .recomb(this.sepiaConfig)
            .toFile(this.dir + path.split('/').pop().replace('.', 'sepia.'));
    }

    async greyscale(path: string){
        await sharp(path)
            .greyscale()
            .toFile(this.dir + path.split('/').pop().replace('.', 'greyscale.'));
    }

    async blur(path: string){
        await sharp(path)
            .blur(10)
            .toFile(this.dir + path.split('/').pop().replace('.', 'blur.'));
    }
}