import fs from 'fs';
import * as jose from 'jose';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const PATH_KEYS = path.resolve(
    dirname(fileURLToPath(import.meta.url)),
    '../confs/keysForTokens'
);

console.log(PATH_KEYS);

const {
    privateKey: priva_acces_token,
    publicKey: public_access_token
} = await jose.generateKeyPair(
    'RS256',
    { extractable: true, modulusLength: 2048 }
);

const {
    privateKey: priva_refresh_token,
    publicKey: public_refresh_token
} = await jose.generateKeyPair(
    'RS256',
    { extractable: true, modulusLength: 2048 }
);

const pem_private_access_token = await jose.exportPKCS8(priva_acces_token);
const pem_public_access_token = await jose.exportSPKI(public_access_token);

const pem_private_refresh_token = await jose.exportPKCS8(priva_refresh_token);
const pem_public_refresh_token = await jose.exportSPKI(public_refresh_token);


const pemWritePrivateAccessToken = fs.createWriteStream(
    `${PATH_KEYS}/private_access_token.key`,
    { encoding:'utf-8' }
);

const pemWritePublicAccessToken = fs.createWriteStream(
    `${PATH_KEYS}/public_access_token.pem`,
    { encoding:'utf-8' }
);

const pemWritePrivateRefreshToken = fs.createWriteStream(
    `${PATH_KEYS}/private_refresh_token.key`,
    { encoding:'utf-8' }
);

const pemWritePublicRefreshToken = fs.createWriteStream(
    `${PATH_KEYS}/public_refresh_token.pem`,
    { encoding:'utf-8' }
);

pemWritePrivateAccessToken.write(pem_private_access_token);
pemWritePublicAccessToken.write(pem_public_access_token);

pemWritePrivateRefreshToken.write(pem_private_refresh_token);
pemWritePublicRefreshToken.write(pem_public_refresh_token)

pemWritePrivateAccessToken.close();
pemWritePublicAccessToken.close();

pemWritePrivateRefreshToken.close();
pemWritePublicRefreshToken.close();

const rs = await jose.generateSecret(
    'A256GCM',
    { extractable: true },
);

const secretForN = await jose.exportJWK(rs);
const secreStream = fs.createWriteStream(
    `${PATH_KEYS}/secrettoken`,
    { encoding: 'utf-8' }
);

secreStream.write(Buffer.from(JSON.stringify(secretForN), 'utf-8').toString('base64'));
secreStream.close()