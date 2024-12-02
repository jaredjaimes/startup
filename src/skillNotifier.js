
export const SkillEvent = {
    System: 'system',
    End: 'skillEnd',
    Start: 'skillStart',
  };
  
  export const SkillNotifier = new class {
    events = [];
    handlers = [];
  
    broadcastUpdate(playerSkills) {
      const totalPoints = playerSkills.skills
        ? playerSkills.skills.points || 0
        : 0;
      this.broadcastEvent(playerSkills.name, SkillEvent.End, { name: playerSkills.name, score: totalPoints });
    }
  
    broadcastEvent(from, type, value) {
      const event = { from, type, value };
      this.receiveEvent(event);
    }
  
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
    removeHandler(handler) {
      this.handlers = this.handlers.filter((h) => h !== handler);
    }
  
    receiveEvent(event) {
      this.events.push(event);
      this.handlers.forEach((handler) => handler(event));
    }
  }();
  