import * as jose from 'jose';
import path, { dirname } from 'path';
import fs from 'fs'; 
import { fileURLToPath } from 'url';

export const PATH = path.resolve(dirname(fileURLToPath(import.meta.url)));

const loadSecretForCrypted = fs.readFileSync(
    path.resolve(PATH, '../../../confs/keysForTokens/secrettoken'), { encoding: 'utf-8' });

const loadKeyAccessToken = fs.readFileSync(
    path.resolve(PATH, '../../../confs/keysForTokens/private_access_token.key'), { encoding: 'utf-8' });
const loadPemAccessToken = fs.readFileSync(
    path.resolve(PATH, '../../../confs/keysForTokens/public_access_token.pem'), { encoding: 'utf-8' });

const loadKeyRefreshToken = fs.readFileSync(
    path.resolve(PATH, '../../../confs/keysForTokens/private_refresh_token.key'), { encoding: 'utf-8' });
const loadPemRefreshToken = fs.readFileSync(
    path.resolve(PATH, '../../../confs/keysForTokens/public_refresh_token.pem'), { encoding: 'utf-8' });

export const SECRETCRYPTETOKEN = JSON.parse(Buffer.from(loadSecretForCrypted, 'base64').toString('utf-8')) as jose.JWK;
export const KEYACCESSTOKEN = await jose.importPKCS8(
    loadKeyAccessToken,
    'RS256',
    { extractable: true }
);
export const PEMACCESSTOKEN = await jose.importSPKI(
    loadPemAccessToken,
    'RS256',
    { extractable: true }
);
export const KEYREFRESHTOKEN = await jose.importPKCS8(
    loadKeyRefreshToken,
    'RS256',
    { extractable: true }
);
export const PEMREFRESHTOKEN = await jose.importSPKI(
    loadPemRefreshToken,
    'RS256',
    { extractable: true }
);