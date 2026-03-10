// ============================================
// MESSAGE (modelo de datos)
// ============================================

export class Message {
  /**
   * @param {string} id
   * @param {string} userId - ID del autor
   * @param {string} userName - Nombre del autor
   * @param {string} content - Texto del mensaje
   * @param {string} timestamp - ISO string
   * @param {Object[]} reactions - [{ emoji, count, users[] }]
   * @param {Message[]} replies - Thread replies
   */
  constructor(id, userId, userName, content, timestamp, reactions = [], replies = []) {
    // TODO: Asignar propiedades
    /**@type {string} */
    this.id = id;
    /**@type {string} */
    this.userId = userId;
    /**@type {string} */
    this.userName = userName;
    /**@type {string} */
    this.content = content;
    /**@type {string} */
    this.timestamp = timestamp;
    /**@type {{emoji: string, count: number, users: string[]}[]} */
    this.reactions = reactions;
    /**@type {Message[]} */
    this.replies = replies;
  }

  /**
   * @param {string} emoji 
   * @param {string} userId 
   */
  addReaction(emoji, userId) {
    // TODO: Buscar reaction con ese emoji
    // Si existe → incrementar count y agregar userId
    // Si no existe → crear { emoji, count: 1, users: [userId] }
    const targetEmoji = this.reactions.find(r => r.emoji == emoji);
    if(targetEmoji) {
      targetEmoji.count += 1;
      targetEmoji.users.push(userId);
    } else {
      const reaction = {emoji: emoji, count: 1, users: [userId]};
      this.reactions.push(reaction);
    }
  }

  /**
   * @param {string} emoji 
   * @param {string} userId 
   */
  removeReaction(emoji, userId) {
    // TODO: Buscar reaction
    // Remover userId del array
    // Si users queda vacío → remover reaction completa
    const indexReaction = this.reactions.findIndex(r => r.emoji === emoji);
    if(indexReaction === -1) return;
    const targetReaction = this.reactions[indexReaction];
    targetReaction.users = targetReaction.users.filter(u => u !== userId);
    targetReaction.count = targetReaction.users.length;
    if(targetReaction.count === 0) {
      this.reactions.splice(indexReaction, 1);
    }
  }

  /**
   * @param {Message} message 
   */
  addReply(message) {
    // TODO: Push a replies
    if(!message) throw new Error("Es necesario un Message");
    this.replies.push(message);
  }

  toJSON() {
    // TODO: Incluir replies.map(r => r.toJSON())
    return {
      id: this.id,
      userId: this.userId,
      userName: this.userName,
      content: this.content,
      timestamp: this.timestamp,
      reactions: this.reactions,
      replies: this.replies.map(r => r.toJSON())
    };
  }

  static fromJSON(json) {
    // TODO: Recursivo para replies

    return new Message(
      json.id,
      json.userId,
      json.userName,
      json.content,
      json.timestamp,
      json.reactions,
      (json.replies.length == 0 ? 
        []: 
        json.replies.map(m => Message.fromJSON(m)))
    );
  }
}

