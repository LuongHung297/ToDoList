const useGroupList = (ListJobJoin) => {
    const groupByCategory = ListJobJoin.reduce((group, ListJobJoin) => {
        const { ProjectId } = ListJobJoin;
        group[ProjectId] = group[ProjectId] ?? [];
        group[ProjectId].push(ListJobJoin);
        return group;
    }, []);
    return groupByCategory
}
export default useGroupList