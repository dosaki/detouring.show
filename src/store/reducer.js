const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PODCAST_INFO':
            return {
                ...state,
                podcastInfo: action.payload
            };
        case 'SET_SELECTED_TAG':
            return {
                ...state,
                selectedTag: `${action.payload}`
            };
        default:
            return state;
    }
};

export default Reducer;
