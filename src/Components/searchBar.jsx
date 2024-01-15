export default function SearchBar({ searchFruit, onSearchFruit }) {
    return (
        <div className="my-2 flex justify-end">
            <input
                type="text"
                placeholder="Search by fruit name"
                value={searchFruit}
                onChange={onSearchFruit}
                className="w-300 p-2 mx-2 border rounded"
            />
        </div>
    );
}