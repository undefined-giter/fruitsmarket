export default function SearchBar({ searchFruit, onSearchFruit }) {
    return (
        <input
            type="text"
            placeholder="Search by fruit name"
            value={searchFruit}
            onChange={onSearchFruit}
            className="p-2 border rounded bg-slate-200 dark:bg-[#0a8c17] dark:text-slate-200 cursor-pointer"
        />
    );
}