import { mdp } from 'src/mdp.js';


test('takes UTF-8 as input', () => {
    expect(mdp("éé+===++#", "{{££¨¨¨^^22lssm")).toBeTruthy();
    expect(mdp("12364L.~##{[[||\\]]}", "{{££¨¨¨^^22lssm")).toBeTruthy();
    expect(mdp("*!/.,%\"\'", "m")).toBeTruthy();
});

test('expected predefined results are correct', () => {
    expect(mdp("aa", "bb")).toBe("*78D(bfCeb1Be6)89-b62=10_Cc46d");
    expect(mdp("randompassword", "andsecret")).toBe("F&2f7fDde*53B(21)ab04-BeaA46=3");
    expect(mdp("abc", "1234567")).toBe("&F82*7ee0(1A9a)f4A3-db84=98B_9");
});