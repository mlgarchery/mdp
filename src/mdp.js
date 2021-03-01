// import { pbkdf2Sync } from 'crypto';
// import { createHash } from 'crypto';
import {sha256} from 'js-sha256';

const PASSWORD_LENGTH = 30;

const SPECIAL_CHARS = '!@#$%^&*()-=_+<>?'.split('');
const NUMBERS = '01234567890'.split('');
const LOWERCASES = 'abcdefghijklmnopqrstuvwxyz'.split('');
const UPPERCASES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function mdp(discriminator, secret){
    // using sha256
    // const hash = createHash('sha256');
    // hash.update(discriminator+secret);
    // return hash.digest('hex');
    const password = sha256(discriminator+secret).slice(0, PASSWORD_LENGTH);
    // Using pbkdf
    // const password_length = 30;
    // const key = pbkdf2Sync(discriminator+secret, "constant", 500, parseInt(password_length/2), 'sha256')
    // return key.toString('hex')

    // should compose this with a function checking/adding special
    // characters, lower and uppercase letter, number ..
    return munge_password(password);
}

function munge_password(password){
    /*
    sha string is PASSWORD_LENGTH long and contains lowercase and numbers.
    Lets add special chars and uppercase.

    The goal with this function would be that it homogeneously add special chars
    and UPPERCASE to the password.
    
    https://en.wikipedia.org/wiki/Munged_password
    */


    const { c_letters, c_numbers } = count_letters_and_numbers(password);
    const target_percentage_special = 0.2
    const target_percentage_uppercase = 0.2;

    let percentage_special = 0;
    let percentage_uppercase = 0;
    let number_special = 0;
    let number_uppercase = 0;
    let password_chars = password.split('');

    let rotate_specials = NUMBERS.includes(password_chars[0]) ? 
                          NUMBERS.indexOf(password_chars[0]) % SPECIAL_CHARS.length : 
                          LOWERCASES.indexOf(password_chars[0]) % SPECIAL_CHARS.length;

    password_chars = password_chars.map(c => {
        if(percentage_uppercase<target_percentage_uppercase){
            if(LOWERCASES.includes(c)){
                percentage_uppercase = number_uppercase++ / c_letters;
                return c.toUpperCase();
            }
        }
        if(percentage_special<target_percentage_special){
            if(NUMBERS.includes(c)){
                percentage_special = number_special++ / c_numbers;
                rotate_specials = (rotate_specials + 1) % SPECIAL_CHARS.length;
                return SPECIAL_CHARS[rotate_specials];
            }
        }
        return c;
    });
    return password_chars.join('');
}

function count_letters_and_numbers(password){
    let c_letters = 0;
    let c_numbers = 0;
    password.split('').forEach( c => {
        if(LOWERCASES.includes(c)){
            c_letters++;
        }
        if(NUMBERS.includes(c)){
            c_numbers++;
        }
    });
    return {c_letters, c_numbers}
}