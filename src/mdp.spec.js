import { slow_hash } from 'src/mdp.js';


test('takes UTF-8 as input', () => {
    expect(slow_hash("éé+===++#", "{{££¨¨¨^^22lssm")).toBeTruthy();
});