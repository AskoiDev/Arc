import { MainClient } from '../../typings/index';

export function help(client: MainClient): any[] {
    const _ = [];
    const categories = client.commands?.map(x => x.category).filter((item, pos, self) => {
        return self.indexOf(item) === pos;
    });

    for (let i = 0; i < (categories?.length as number); i += 1) {
        const category = (categories as string[])[i];
        const commands = client.commands?.filter(x => x.category === category).map(x => x.name);;
        const command = (commands?.length as number) < 1 ? 'None' : (commands?.join('`, `') as string);
        _.push({ category: category, names: `\`${command}\`` });
    }

    return _;
}