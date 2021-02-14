// import { pbkdf2Sync } from 'crypto';
// import { createHash } from 'crypto';
import {sha256} from 'js-sha256';

export function mdp(discriminator, secret){
    // using sha256
    // const hash = createHash('sha256');
    // hash.update(discriminator+secret);
    // return hash.digest('hex');
    return compose_sha256_and_shorten(discriminator+secret, 30);

    // Using pbkdf
    // const password_length = 30;
    // const key = pbkdf2Sync(discriminator+secret, "constant", 500, parseInt(password_length/2), 'sha256')
    // return key.toString('hex')

    // should compose this with a function checking/adding special
    // characters, lower and uppercase letter, number ..
}

function compose_sha256_and_shorten(message, size){
    let result = message;
    for(let i=0; i<500; i++){
        result = sha256(result)
    }
    return result.slice(0, size)
}

function add_special_characters(){

}