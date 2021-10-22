import axios from 'axios';

export class PixabayFetch {
  constructor(base_url, api_key) {
    this.base_url = base_url;
    this.api_key = api_key;
    this._searchQuery = '';
    this._page = 1;
    this.perPage = 12;
  }

  get searchQuery() {
    return this._searchQuery;
  }
  set searchQuery(value) {
    return (this._searchQuery = value);
  }
  resetPage() {
    return (this._page = 1, this._searchQuery = '');
  }

  get page() {
    return this._page;
  }
  set page(value) {
    return (this._page += value);
  }
  
  async searchPhotos() {
    axios.defaults.baseURL = this.base_url;

    let url = `?q=${this._searchQuery}&page=${this.page}&key=${this.api_key}&image_type=photo&orientation=horizontal&per_page=${this.perPage}`;
    try {
      const result = await axios.get(url);
      const data = result.data.hits;
      return data;
    } catch (err) {
      return err.message;
     }

  }
}

