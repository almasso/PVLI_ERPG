import NPC from './obj/npc.js'



class QuestNPC extends NPC {
    constructor(scene, x, y, imageID, npcID, dialogues, manin, quest) {
        super(scene, x, y, imageID, npcID, dialogues, manin);
        this.quest = quest;
    }

    activateQuest(){
        this.manin.questLog.addQuest(this.quest);
    }

    advanceQuest(){
        this.manin.questLog.advanceQuest(this.quest.id);
    }
}

// this should be mostly HUD but also some management
class QuestLog {
    constructor(){
        this.quests = [];
    }

    addQuest(quest){
        this.quests.push(quest);
        // añadir todos los textos y eso
    }

    advanceQuest(id){
        for(let i of this.quests){
            if(this.quests[i].id == id){
                this.quests[i].advanceQuest();
                break;
            }
        }
    }
}

class Quest {
    constructor(npc, stages, id, objectives){
        this.npc = npc;
        this.stages = stages;
        this.stage = 0;
        this.id = id;
        this.objectives = objectives;
        this.finished = false;
    }

    advanceQuest(){
        if(!finished){
            this.stage++;
            if(this.stage >= this.stages) this.finished = true;
            this.setCurrentObjectives();
        }
    }

    setCurrentObjectives(){
        if(!finished){
            this.currentObjectives = this.objectives[stages];
        }
        else{
            this.currentObjectives = "QUEST COMPLETE";
        }
    }
}