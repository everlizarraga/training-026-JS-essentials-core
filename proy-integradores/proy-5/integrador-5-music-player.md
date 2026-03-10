# 🎵 INTEGRADOR 5: MUSIC PLAYER APP

**Duración:** 5-7 días máximo  
**Nivel:** Senior (el más complejo del entrenamiento)  
**Objetivo:** Construir reproductor de música completo con playlists, controles avanzados, y visualización

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

**Un reproductor de música profesional con:**
- 🎵 Player con controles completos (play/pause/next/prev/shuffle/repeat)
- 📋 Playlists personalizadas (crear, editar, eliminar)
- ⭐ Sistema de favoritos
- 🔍 Búsqueda de canciones
- 📊 Visualización de progreso y tiempo
- 🔊 Control de volumen
- 🎨 Visualización de artwork
- 💾 Persistencia completa (playlists + estado del player)

---

## ✅ FEATURES MÍNIMAS (MVP)

### Must Have:

**Player Controls:**
- [ ] Play/Pause actual canción
- [ ] Next/Previous track
- [ ] Progress bar (seekable - click para saltar)
- [ ] Time display (current / total)
- [ ] Volume control (slider)

**Library:**
- [ ] Lista de todas las canciones disponibles
- [ ] Play canción desde library
- [ ] Búsqueda por título/artista
- [ ] Vista actual "Now Playing"

**Playlists:**
- [ ] Crear playlist
- [ ] Agregar canciones a playlist
- [ ] Remover canciones de playlist
- [ ] Eliminar playlist
- [ ] Play playlist completa

**Favorites:**
- [ ] Toggle favorite en canción
- [ ] Vista de favoritas
- [ ] Play favoritas

**Persistence:**
- [ ] Guardar playlists en localStorage
- [ ] Guardar favoritos
- [ ] Restaurar estado al recargar

---

### Nice to Have (si sobra tiempo):

- [ ] Shuffle mode (orden aleatorio)
- [ ] Repeat mode (off/one/all)
- [ ] Queue system (cola de reproducción)
- [ ] Drag & drop para reordenar playlist
- [ ] Visualización de audio (waveform/bars)
- [ ] Lyrics display
- [ ] Export/Import playlists (JSON)

---

## 🎨 UI COMPLETA (HTML/CSS)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Music Player</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      height: 100vh;
      overflow: hidden;
    }

    .app {
      display: flex;
      height: 100vh;
    }

    /* Sidebar */
    .sidebar {
      width: 240px;
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
    }

    .sidebar-header {
      padding: 24px 20px;
      font-size: 1.5rem;
      font-weight: 700;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .nav {
      flex: 1;
      overflow-y: auto;
    }

    .nav-section {
      padding: 16px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .nav-title {
      padding: 8px 20px;
      font-size: 0.75rem;
      text-transform: uppercase;
      opacity: 0.6;
      font-weight: 600;
    }

    .nav-item {
      padding: 12px 20px;
      cursor: pointer;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.9rem;
    }

    .nav-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .nav-item.active {
      background: rgba(255, 255, 255, 0.2);
      font-weight: 600;
    }

    .nav-icon {
      font-size: 1.2rem;
    }

    .btn-create-playlist {
      margin: 12px 20px;
      padding: 10px;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 6px;
      color: white;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 600;
      transition: background 0.2s;
    }

    .btn-create-playlist:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    /* Main Content */
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10px);
    }

    /* Header */
    .content-header {
      padding: 24px 32px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .view-title {
      font-size: 1.8rem;
      font-weight: 700;
    }

    .search-box {
      position: relative;
    }

    .search-input {
      padding: 10px 16px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      color: white;
      font-size: 0.9rem;
      width: 300px;
    }

    .search-input::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    .search-input:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.4);
    }

    /* Content Area */
    .content-area {
      flex: 1;
      overflow-y: auto;
      padding: 24px 32px;
    }

    /* Song List */
    .song-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .song-item {
      display: grid;
      grid-template-columns: 50px 1fr 200px 100px 50px;
      gap: 16px;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      align-items: center;
      cursor: pointer;
      transition: background 0.2s;
    }

    .song-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .song-item.playing {
      background: rgba(255, 255, 255, 0.15);
    }

    .song-number {
      text-align: center;
      font-size: 0.9rem;
      opacity: 0.7;
    }

    .song-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .song-artwork {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .song-details {
      flex: 1;
    }

    .song-title {
      font-weight: 600;
      font-size: 0.95rem;
    }

    .song-artist {
      font-size: 0.85rem;
      opacity: 0.7;
    }

    .song-album {
      font-size: 0.85rem;
      opacity: 0.7;
    }

    .song-duration {
      font-size: 0.9rem;
      opacity: 0.7;
    }

    .song-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .btn-favorite {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 1.2rem;
      opacity: 0.5;
      transition: opacity 0.2s;
    }

    .btn-favorite:hover {
      opacity: 1;
    }

    .btn-favorite.active {
      opacity: 1;
      color: #ff6b6b;
    }

    /* Player (Bottom Bar) */
    .player {
      height: 90px;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(20px);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      gap: 16px;
      padding: 0 24px;
      align-items: center;
    }

    /* Now Playing */
    .now-playing {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .now-playing-artwork {
      width: 56px;
      height: 56px;
      border-radius: 6px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .now-playing-info {
      flex: 1;
    }

    .now-playing-title {
      font-weight: 600;
      font-size: 0.95rem;
    }

    .now-playing-artist {
      font-size: 0.85rem;
      opacity: 0.7;
    }

    /* Player Controls */
    .player-controls {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .controls-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      align-items: center;
    }

    .btn-control {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 1.2rem;
      opacity: 0.8;
      transition: all 0.2s;
      padding: 8px;
    }

    .btn-control:hover {
      opacity: 1;
      transform: scale(1.1);
    }

    .btn-control.btn-play {
      font-size: 2rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-control.btn-play:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .btn-control.active {
      color: #667eea;
      opacity: 1;
    }

    .progress-bar-container {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .time {
      font-size: 0.75rem;
      opacity: 0.7;
      min-width: 40px;
    }

    .progress-bar {
      flex: 1;
      height: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
      cursor: pointer;
      position: relative;
    }

    .progress-bar-fill {
      height: 100%;
      background: white;
      border-radius: 2px;
      width: 0%;
      transition: width 0.1s linear;
    }

    /* Volume */
    .volume-control {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: flex-end;
    }

    .volume-icon {
      font-size: 1.2rem;
    }

    .volume-slider {
      width: 100px;
      height: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
      cursor: pointer;
      position: relative;
    }

    .volume-slider-fill {
      height: 100%;
      background: white;
      border-radius: 2px;
      width: 100%;
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 80px 20px;
      opacity: 0.6;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 16px;
    }

    /* Scrollbar */
    .content-area::-webkit-scrollbar {
      width: 8px;
    }

    .content-area::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
    }

    .content-area::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="app">

    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        🎵 Music Player
      </div>

      <nav class="nav" id="nav">
        <!-- Navegación se renderiza dinámicamente -->
        
        <!-- EJEMPLO de nav items -->
        <div class="nav-section">
          <div class="nav-title">Library</div>
          <div class="nav-item active" data-view="all-songs">
            <span class="nav-icon">🎵</span>
            <span>All Songs</span>
          </div>
          <div class="nav-item" data-view="favorites">
            <span class="nav-icon">⭐</span>
            <span>Favorites</span>
          </div>
        </div>

        <div class="nav-section">
          <div class="nav-title">Playlists</div>
          <!-- Playlists se renderizan aquí -->
          <div class="nav-item" data-playlist-id="playlist-1">
            <span class="nav-icon">📋</span>
            <span>My Playlist</span>
          </div>
        </div>
      </nav>

      <button class="btn-create-playlist" id="btn-create-playlist">
        ➕ New Playlist
      </button>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      
      <!-- Header -->
      <div class="content-header">
        <h1 class="view-title" id="view-title">All Songs</h1>
        <div class="search-box">
          <input 
            type="text" 
            class="search-input" 
            id="search-input" 
            placeholder="Search songs, artists..."
          >
        </div>
      </div>

      <!-- Content Area -->
      <div class="content-area" id="content-area">
        <!-- Lista de canciones se renderiza aquí -->
        
        <!-- EJEMPLO de song item -->
        <div class="song-list">
          <div class="song-item" data-id="song-1">
            <div class="song-number">1</div>
            <div class="song-info">
              <div class="song-artwork">🎵</div>
              <div class="song-details">
                <div class="song-title">Bohemian Rhapsody</div>
                <div class="song-artist">Queen</div>
              </div>
            </div>
            <div class="song-album">A Night at the Opera</div>
            <div class="song-duration">5:55</div>
            <div class="song-actions">
              <button class="btn-favorite">♡</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Player (Bottom Bar) -->
  <div class="player">
    
    <!-- Now Playing -->
    <div class="now-playing">
      <div class="now-playing-artwork">🎵</div>
      <div class="now-playing-info">
        <div class="now-playing-title">No song playing</div>
        <div class="now-playing-artist">---</div>
      </div>
    </div>

    <!-- Controls -->
    <div class="player-controls">
      <div class="controls-buttons">
        <button class="btn-control" id="btn-shuffle" title="Shuffle">
          🔀
        </button>
        <button class="btn-control" id="btn-prev">
          ⏮️
        </button>
        <button class="btn-control btn-play" id="btn-play">
          ▶️
        </button>
        <button class="btn-control" id="btn-next">
          ⏭️
        </button>
        <button class="btn-control" id="btn-repeat" title="Repeat">
          🔁
        </button>
      </div>
      
      <div class="progress-bar-container">
        <span class="time" id="current-time">0:00</span>
        <div class="progress-bar" id="progress-bar">
          <div class="progress-bar-fill" id="progress-bar-fill"></div>
        </div>
        <span class="time" id="total-time">0:00</span>
      </div>
    </div>

    <!-- Volume -->
    <div class="volume-control">
      <span class="volume-icon">🔊</span>
      <div class="volume-slider" id="volume-slider">
        <div class="volume-slider-fill" id="volume-slider-fill"></div>
      </div>
    </div>

  </div>

  <script type="module" src="app.js"></script>
</body>
</html>
```

---

## 🏗️ ARQUITECTURA MVC

### **Song (modelo de datos)**

```javascript
// ============================================
// SONG (modelo de datos)
// ============================================

export class Song {
  /**
   * @param {string} id
   * @param {string} title
   * @param {string} artist
   * @param {string} album
   * @param {number} duration - En segundos
   * @param {string} audioUrl - URL del archivo de audio
   * @param {string} artworkUrl - URL de la imagen (opcional)
   */
  constructor(id, title, artist, album, duration, audioUrl, artworkUrl = null) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.duration = duration; // segundos
    this.audioUrl = audioUrl;
    this.artworkUrl = artworkUrl;
  }

  /**
   * Formatear duración a MM:SS
   * @returns {string}
   */
  getFormattedDuration() {
    const minutes = Math.floor(this.duration / 60);
    const seconds = Math.floor(this.duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      artist: this.artist,
      album: this.album,
      duration: this.duration,
      audioUrl: this.audioUrl,
      artworkUrl: this.artworkUrl
    };
  }

  static fromJSON(json) {
    return new Song(
      json.id,
      json.title,
      json.artist,
      json.album,
      json.duration,
      json.audioUrl,
      json.artworkUrl
    );
  }
}
```

---

### **Playlist (modelo de datos)**

```javascript
// ============================================
// PLAYLIST (modelo de datos)
// ============================================

export class Playlist {
  /**
   * @param {string} id
   * @param {string} name
   * @param {string[]} songIds - Array de IDs de canciones
   */
  constructor(id, name, songIds = []) {
    this.id = id;
    this.name = name;
    this.songIds = songIds;
  }

  addSong(songId) {
    // TODO: Agregar songId si no existe
    if (!this.songIds.includes(songId)) {
      this.songIds.push(songId);
    }
  }

  removeSong(songId) {
    // TODO: Remover songId
    this.songIds = this.songIds.filter(id => id !== songId);
  }

  getSongCount() {
    return this.songIds.length;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      songIds: this.songIds
    };
  }

  static fromJSON(json) {
    return new Playlist(json.id, json.name, json.songIds);
  }
}
```

---

### **MusicModel (lógica de negocio)**

```javascript
// ============================================
// MUSIC MODEL (lógica de negocio)
// ============================================

import { Song } from './song.js';
import { Playlist } from './playlist.js';

export class MusicModel {
  #library = [];        // Song[]
  #playlists = [];      // Playlist[]
  #favorites = new Set(); // Set<songId>
  
  #currentSongId = null;
  #isPlaying = false;
  #currentTime = 0;
  #volume = 1.0; // 0.0 - 1.0
  #shuffle = false;
  #repeat = 'off'; // 'off' | 'one' | 'all'
  
  #currentView = 'all-songs'; // 'all-songs' | 'favorites' | 'playlist-X'
  
  #nextSongId = 1;
  #nextPlaylistId = 1;
  #observers = [];

  constructor() {
    this.#initializeLibrary();
  }

  // ==========================================
  // OBSERVER
  // ==========================================

  subscribe(callback) {
    // TODO: Implementar
  }

  notify() {
    // TODO: Implementar
  }

  // ==========================================
  // INITIALIZATION
  // ==========================================

  #initializeLibrary() {
    // TODO: Crear canciones de ejemplo
    // Usar URLs de ejemplo (pueden ser URLs reales de Creative Commons)
    // O usar data URLs de audio generado
    
    // Ejemplo:
    this.#library = [
      new Song('song-1', 'Bohemian Rhapsody', 'Queen', 'A Night at the Opera', 355, 'audio/song1.mp3'),
      new Song('song-2', 'Stairway to Heaven', 'Led Zeppelin', 'Led Zeppelin IV', 482, 'audio/song2.mp3'),
      // ... más canciones
    ];
  }

  // ==========================================
  // LIBRARY
  // ==========================================

  getAllSongs() {
    // TODO: Retornar copia
  }

  getSongById(songId) {
    // TODO: Find song
  }

  // ==========================================
  // PLAYLISTS
  // ==========================================

  createPlaylist(name) {
    // TODO: Crear Playlist
    // TODO: Push a #playlists
    // TODO: notify()
  }

  deletePlaylist(playlistId) {
    // TODO: Filtrar #playlists
    // TODO: notify()
  }

  addSongToPlaylist(playlistId, songId) {
    // TODO: Buscar playlist
    // TODO: playlist.addSong(songId)
    // TODO: notify()
  }

  removeSongFromPlaylist(playlistId, songId) {
    // TODO: Buscar playlist
    // TODO: playlist.removeSong(songId)
    // TODO: notify()
  }

  getPlaylistById(playlistId) {
    // TODO: Find playlist
  }

  getAllPlaylists() {
    // TODO: Retornar copia
  }

  // ==========================================
  // FAVORITES
  // ==========================================

  toggleFavorite(songId) {
    // TODO: Si está en Set → remover
    // TODO: Si no → agregar
    // TODO: notify()
  }

  isFavorite(songId) {
    return this.#favorites.has(songId);
  }

  getFavoriteSongs() {
    // TODO: Filtrar library por IDs en #favorites
  }

  // ==========================================
  // PLAYER STATE
  // ==========================================

  playSong(songId) {
    // TODO: Setear #currentSongId
    // TODO: Setear #isPlaying = true
    // TODO: notify()
  }

  pause() {
    // TODO: Setear #isPlaying = false
    // TODO: notify()
  }

  resume() {
    // TODO: Setear #isPlaying = true
    // TODO: notify()
  }

  togglePlayPause() {
    // TODO: Toggle #isPlaying
    // TODO: notify()
  }

  next() {
    // TODO: Obtener siguiente canción
    // TODO: Considerar shuffle y repeat
    // TODO: playSong()
  }

  prev() {
    // TODO: Obtener canción anterior
    // TODO: playSong()
  }

  seek(timeInSeconds) {
    // TODO: Setear #currentTime
    // TODO: notify()
  }

  setVolume(volume) {
    // TODO: Setear #volume (clamp 0-1)
    // TODO: notify()
  }

  toggleShuffle() {
    // TODO: Toggle #shuffle
    // TODO: notify()
  }

  cycleRepeat() {
    // TODO: Ciclar entre 'off' → 'all' → 'one'
    // TODO: notify()
  }

  // Getters
  getCurrentSong() {
    return this.#currentSongId ? this.getSongById(this.#currentSongId) : null;
  }

  isPlaying() {
    return this.#isPlaying;
  }

  getCurrentTime() {
    return this.#currentTime;
  }

  getVolume() {
    return this.#volume;
  }

  isShuffle() {
    return this.#shuffle;
  }

  getRepeatMode() {
    return this.#repeat;
  }

  // ==========================================
  // VIEW MANAGEMENT
  // ==========================================

  setCurrentView(view) {
    // TODO: Setear #currentView
    // view puede ser: 'all-songs', 'favorites', 'playlist-X'
    // TODO: notify()
  }

  getCurrentView() {
    return this.#currentView;
  }

  getCurrentViewSongs() {
    // TODO: Según #currentView, retornar canciones correspondientes
    // 'all-songs' → getAllSongs()
    // 'favorites' → getFavoriteSongs()
    // 'playlist-X' → songs de esa playlist
  }

  // ==========================================
  // SEARCH
  // ==========================================

  searchSongs(query) {
    // TODO: Filtrar library por título o artista
    // Case-insensitive
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  toJSON() {
    return {
      playlists: this.#playlists.map(p => p.toJSON()),
      favorites: Array.from(this.#favorites),
      currentSongId: this.#currentSongId,
      volume: this.#volume,
      shuffle: this.#shuffle,
      repeat: this.#repeat
    };
  }

  loadFromJSON(data) {
    this.#playlists = data.playlists.map(p => Playlist.fromJSON(p));
    this.#favorites = new Set(data.favorites);
    this.#currentSongId = data.currentSongId;
    this.#volume = data.volume || 1.0;
    this.#shuffle = data.shuffle || false;
    this.#repeat = data.repeat || 'off';
  }
}
```

---

### **MusicView (presentación)**

```javascript
// ============================================
// MUSIC VIEW (presentación)
// ============================================

export class MusicView {
  constructor(navId, contentAreaId, viewTitleId, searchInputId) {
    this.nav = document.getElementById(navId);
    this.contentArea = document.getElementById(contentAreaId);
    this.viewTitle = document.getElementById(viewTitleId);
    this.searchInput = document.getElementById(searchInputId);
    
    // Player elements
    this.btnPlay = document.getElementById('btn-play');
    this.btnPrev = document.getElementById('btn-prev');
    this.btnNext = document.getElementById('btn-next');
    this.btnShuffle = document.getElementById('btn-shuffle');
    this.btnRepeat = document.getElementById('btn-repeat');
    
    this.currentTime = document.getElementById('current-time');
    this.totalTime = document.getElementById('total-time');
    this.progressBar = document.getElementById('progress-bar');
    this.progressBarFill = document.getElementById('progress-bar-fill');
    
    this.volumeSlider = document.getElementById('volume-slider');
    this.volumeSliderFill = document.getElementById('volume-slider-fill');
    
    this.nowPlayingArtwork = document.querySelector('.now-playing-artwork');
    this.nowPlayingTitle = document.querySelector('.now-playing-title');
    this.nowPlayingArtist = document.querySelector('.now-playing-artist');
  }

  // ==========================================
  // RENDERING - NAVIGATION
  // ==========================================

  renderNav(playlists, currentView) {
    // TODO: Renderizar nav completo
    // Incluir: All Songs, Favorites, Playlists
  }

  // ==========================================
  // RENDERING - CONTENT
  // ==========================================

  renderSongs(songs, currentSongId, favorites) {
    // TODO: Renderizar lista de canciones
    // Marcar canción actual con .playing
    // Marcar favoritos con .active en btn-favorite
  }

  renderSong(song, index, isPlaying, isFavorite) {
    // TODO: Retornar HTML de song-item
  }

  renderEmpty(message) {
    // TODO: Empty state
  }

  // ==========================================
  // PLAYER UI
  // ==========================================

  updateNowPlaying(song) {
    // TODO: Actualizar now-playing section
    // Si song es null → mostrar "No song playing"
  }

  updatePlayButton(isPlaying) {
    // TODO: Cambiar ícono ▶️ / ⏸️
  }

  updateProgress(currentTime, totalTime) {
    // TODO: Actualizar progress bar y times
  }

  updateVolume(volume) {
    // TODO: Actualizar volume slider
  }

  updateShuffleButton(isActive) {
    // TODO: Toggle clase .active
  }

  updateRepeatButton(mode) {
    // TODO: Cambiar ícono según mode
    // 'off' → 🔁 (normal)
    // 'all' → 🔁 (active)
    // 'one' → 🔂 (active)
  }

  // ==========================================
  // HELPERS
  // ==========================================

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ==========================================
  // EVENTS
  // ==========================================

  onNavClick(callback) {
    // TODO: Event delegation
    // Detectar clicks en nav-items
    // Callback recibe: view ('all-songs' | 'favorites' | 'playlist-X')
  }

  onCreatePlaylist(callback) {
    // TODO: Click en btn-create-playlist
  }

  onSongClick(callback) {
    // TODO: Event delegation
    // Callback recibe: songId
  }

  onFavoriteClick(callback) {
    // TODO: Event delegation en btn-favorite
    // Callback recibe: songId
  }

  onPlayPause(callback) {
    // TODO: Click en btn-play
  }

  onNext(callback) {
    // TODO: Click en btn-next
  }

  onPrev(callback) {
    // TODO: Click en btn-prev
  }

  onShuffle(callback) {
    // TODO: Click en btn-shuffle
  }

  onRepeat(callback) {
    // TODO: Click en btn-repeat
  }

  onProgressBarClick(callback) {
    // TODO: Click en progress-bar
    // Calcular % y convertir a tiempo
    // Callback recibe: timeInSeconds
  }

  onVolumeChange(callback) {
    // TODO: Click en volume-slider
    // Callback recibe: volume (0-1)
  }

  onSearch(callback) {
    // TODO: Input con debounce
    // Callback recibe: query
  }
}
```

---

### **MusicController (coordinación)**

```javascript
// ============================================
// MUSIC CONTROLLER (coordinación)
// ============================================

import { MusicModel } from './music-model.js';
import { MusicView } from './music-view.js';

const STORAGE_KEY = 'APP:music-player';

export class MusicController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    
    // Audio element (Web Audio API)
    this.audio = new Audio();
    this.audio.volume = this.model.getVolume();
    
    // Setup
    this.model.subscribe(() => this.updateView());
    this.setupListeners();
    this.setupAudioListeners();
    
    this.load();
    this.updateView();
  }

  setupListeners() {
    // TODO: Setup TODOS los event listeners
    // Nav, songs, player controls, etc.
  }

  setupAudioListeners() {
    // TODO: Audio events
    // 'timeupdate' → actualizar progreso
    // 'ended' → next() automático
    // 'loadedmetadata' → duration disponible
  }

  // ==========================================
  // ACTIONS - LIBRARY
  // ==========================================

  switchView(view) {
    // TODO: model.setCurrentView(view)
  }

  playSong(songId) {
    // TODO: model.playSong(songId)
    // TODO: Cargar audio: this.audio.src = song.audioUrl
    // TODO: this.audio.play()
  }

  // ==========================================
  // ACTIONS - PLAYER
  // ==========================================

  togglePlayPause() {
    // TODO: Si está playing → pause()
    // TODO: Si no → resume()
  }

  pause() {
    // TODO: model.pause()
    // TODO: this.audio.pause()
  }

  resume() {
    // TODO: model.resume()
    // TODO: this.audio.play()
  }

  next() {
    // TODO: model.next()
    // TODO: Cargar nueva canción
  }

  prev() {
    // TODO: model.prev()
    // TODO: Cargar nueva canción
  }

  seek(timeInSeconds) {
    // TODO: model.seek(time)
    // TODO: this.audio.currentTime = time
  }

  setVolume(volume) {
    // TODO: model.setVolume(volume)
    // TODO: this.audio.volume = volume
  }

  toggleShuffle() {
    // TODO: model.toggleShuffle()
  }

  cycleRepeat() {
    // TODO: model.cycleRepeat()
  }

  // ==========================================
  // ACTIONS - PLAYLISTS
  // ==========================================

  createPlaylist() {
    // TODO: Prompt nombre
    // TODO: model.createPlaylist(name)
  }

  toggleFavorite(songId) {
    // TODO: model.toggleFavorite(songId)
  }

  // ==========================================
  // VIEW UPDATE
  // ==========================================

  updateView() {
    // TODO: Obtener datos del model
    // TODO: Renderizar nav, content, player state
  }

  updateProgress() {
    // TODO: Obtener currentTime del audio
    // TODO: view.updateProgress()
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  save() {
    // TODO: localStorage
  }

  load() {
    // TODO: localStorage
  }
}
```

---

## 🎯 CONCEPTOS NUEVOS

### **1. Web Audio API**

```javascript
// Audio element
const audio = new Audio();
audio.src = 'path/to/song.mp3';

// Eventos importantes
audio.addEventListener('timeupdate', () => {
  console.log('Current time:', audio.currentTime);
});

audio.addEventListener('ended', () => {
  console.log('Song finished');
});

audio.addEventListener('loadedmetadata', () => {
  console.log('Duration:', audio.duration);
});

// Controles
audio.play();
audio.pause();
audio.currentTime = 30; // Seek to 30 seconds
audio.volume = 0.5; // 50% volume (0.0 - 1.0)
```

---

### **2. Progress Bar Interactiva**

```javascript
// Click en progress bar para seek
progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percentage = clickX / rect.width;
  const newTime = percentage * audio.duration;
  
  audio.currentTime = newTime;
});
```

---

### **3. Shuffle Algorithm**

```javascript
// Fisher-Yates shuffle
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
```

---

### **4. Repeat Modes**

```javascript
// En audio.addEventListener('ended')
if (repeatMode === 'one') {
  audio.currentTime = 0;
  audio.play();
} else if (repeatMode === 'all') {
  next(); // Ir a siguiente (con wrap-around)
} else {
  // 'off' - solo parar
}
```

---

## 🎨 PATTERNS INTRODUCIDOS

1. **State Management Pattern** - Player state complejo
2. **Event-Driven Architecture** - Audio events → UI updates
3. **Queue Pattern** - Lista de reproducción
4. **Strategy Pattern** - Shuffle/Repeat modes

---

## 📊 CRONOGRAMA SUGERIDO

### **Día 1-2: Setup + Library**
- [ ] Crear todas las clases (Song, Playlist, Model, View, Controller)
- [ ] Inicializar biblioteca de canciones
- [ ] Renderizar lista de canciones
- [ ] Navegación básica (All Songs, Favorites)

### **Día 3: Player Básico**
- [ ] Play/Pause canción
- [ ] Next/Previous
- [ ] Progress bar (visualización)
- [ ] Now Playing display

### **Día 4: Player Avanzado**
- [ ] Progress bar interactiva (seek)
- [ ] Volume control
- [ ] Auto-next cuando termina canción
- [ ] Time display actualizado

### **Día 5: Playlists**
- [ ] Crear playlist
- [ ] Agregar/remover canciones
- [ ] Play playlist
- [ ] Persistencia

### **Día 6: Features Extra**
- [ ] Shuffle mode
- [ ] Repeat mode
- [ ] Favorites toggle
- [ ] Búsqueda

### **Día 7: Polish**
- [ ] Testing completo
- [ ] Bug fixes
- [ ] Animaciones/transiciones
- [ ] Documentación

---

## ⚠️ NOTAS IMPORTANTES

### **Audio Files:**

Para testing, podés usar:

**Opción 1: URLs públicas de Creative Commons**
```javascript
// Ejemplo de biblioteca con URLs reales
const songs = [
  new Song('song-1', 'Sample Song', 'Artist', 'Album', 180, 
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')
];
```

**Opción 2: Audio files locales**
- Poné archivos MP3 en carpeta `/audio/`
- Referenciá como `'audio/song1.mp3'`

---

### **localStorage Size Limit:**

- localStorage tiene límite (~5-10MB)
- NO guardes audio files (solo URLs)
- Solo guardá playlists, favorites, settings

---

### **Performance:**

- Si library es grande (100+ songs), considerá virtualización
- Renderizar solo canciones visibles (scroll virtual)
- Para MVP, 20-30 canciones es suficiente

---

## ✅ CHECKLIST FINAL

Al completar, deberías tener:

- [ ] Biblioteca de canciones funcional
- [ ] Player con play/pause/next/prev
- [ ] Progress bar interactiva (seek)
- [ ] Volume control
- [ ] Playlists CRUD completo
- [ ] Sistema de favoritos
- [ ] Shuffle y Repeat modes
- [ ] Búsqueda funcionando
- [ ] Persistencia completa
- [ ] UI responsive y pulida

---

## 🎯 OBJETIVO FINAL

**Al terminar este proyecto tendrás:**
- ✅ Dominio de Web Audio API
- ✅ Manejo de estado complejo (player state)
- ✅ Event-driven architecture
- ✅ UI interactiva avanzada (progress bars, sliders)
- ✅ Proyecto portfolio-ready profesional

**Este es el proyecto MÁS COMPLEJO del entrenamiento.**

---

**FIN DEL INTEGRADOR 5**

¡Disfruta construyendo tu Music Player! 🎵
