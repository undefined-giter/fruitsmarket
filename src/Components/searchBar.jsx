export default function SearchBar({ searchFruit, onSearchFruit }) {
    return (
        <input
            type="text"
            placeholder="Search by fruit name"
            value={searchFruit}
            onChange={onSearchFruit}
            className="p-2 border rounded"
        />
    );
}