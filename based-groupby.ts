export type Group<T, K extends keyof T> = {
    /**
     * the `&` is used to restrict the allowed types,
     * without it TS gives an error.
     */
    [key in T[K] & (string | number | symbol)]: T[];
};

export const groupBy = <T, K extends keyof T>(
    items: T[],
    key: K,
    {
        giveEmptyArraysForUnreachedGroups = false,
    }: {
        giveEmptyArraysForUnreachedGroups?: false | T[K][];
    } = {},
): Group<T, K> => {
    type GroupName = T[K];

    const groups = new Map<GroupName, T[]>();

    if (giveEmptyArraysForUnreachedGroups) {
        giveEmptyArraysForUnreachedGroups.forEach(group => groups.set(group, []));
    }

    for (const item of items) {
        const groupName: GroupName = item[key];

        let group: T[];

        if (!groups.has(groupName)) {
            group = [item];
        } else {
            group = groups.get(groupName)!;
            group.push(item);
        }

        groups.set(groupName, group);
    }

    return Object.fromEntries([...groups.entries()]);
};

