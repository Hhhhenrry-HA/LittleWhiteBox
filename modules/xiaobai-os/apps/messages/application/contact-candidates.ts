export interface KnownPerson { name: string; aliases: string[]; text: string }

const nameKey = (name: string) => name.trim().normalize('NFKC').toLocaleLowerCase();

/** Contact suggestions come from known people, never from chat/card titles. */
export function selectContactCandidates(people: readonly KnownPerson[], playerName: string): KnownPerson[] {
    const player = nameKey(playerName);
    return people
        .filter(person => !player || ![person.name, ...person.aliases].some(name => nameKey(name) === player))
        .slice(0, 200)
        .map(person => ({ ...person, aliases: [...person.aliases], text: '' }));
}
