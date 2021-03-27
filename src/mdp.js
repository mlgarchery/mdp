import { pbkdf2Sync } from 'crypto';

const PASSWORD_LENGTH = 30;

const SPECIAL_CHARS = '!@#$%^&*()-=_+<>?'.split('');
const NUMBERS = '01234567890'.split('');
const LOWERCASES = 'abcdefghijklmnopqrstuvwxyz'.split('');

export function mdp(discriminator, secret){
    const password = slow_hash(secret, discriminator).slice(0, PASSWORD_LENGTH);
    return munge_password(password);
}

export function slow_hash(secret, discriminator){
    // Using pbkdf
    const key = pbkdf2Sync(secret, discriminator, 500, parseInt(PASSWORD_LENGTH/2), 'sha256')
    return key.toString('hex')
}

export function munge_password(password){
    /*
    password is PASSWORD_LENGTH long and contains lowercase and numbers.
    Lets add uppercase and special chars.

    https://en.wikipedia.org/wiki/Munged_password
    */

    let password_chars = password.split('');
    let rotate_specials = NUMBERS.includes(password_chars[0]) ? 
    NUMBERS.indexOf(password_chars[0]) % SPECIAL_CHARS.length : 
    LOWERCASES.indexOf(password_chars[0]) % SPECIAL_CHARS.length;
    const uppercase_rate = 3
    const specials_rate = 3;

    let lowercases_count = 0;
    let specials_count = 0;
    password_chars = password_chars.map(c => {
        if(LOWERCASES.includes(c) && lowercases_count++ % uppercase_rate === 0){
            return c.toUpperCase();
        }
        if(NUMBERS.includes(c) && specials_count++ % specials_rate === 0){
            rotate_specials = (rotate_specials + 1) % SPECIAL_CHARS.length;
            return SPECIAL_CHARS[rotate_specials];
        }
        return c;
    });
    return password_chars.join('');
}
