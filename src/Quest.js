import NPC from './obj/npc.js'

export class QuestNPC extends NPC {
    constructor(scene, x, y, imageID, npcID, dialogues, manin, quest) {
        super(scene, x, y, imageID, npcID, dialogues, manin);
        this.quest = quest;
    }

    activateQuest(){
        if(!this.quest.acquired){
            this.manin.questLog.addQuest(this.quest);
            this.manin.questLog.actualQuest = this.manin.questLog.numQuests - 1; 
            this.scene.scene.get('hud').UpdateHUD();
            this.quest.acquired = true;   
        }
    }

    advanceQuest(){
        this.quest.advanceQuest(this.quest.id);
        this.manin.questLog.actualQuest = this.manin.questLog.GetQuest(this.quest.id).index; 
        this.scene.scene.get('hud').UpdateHUD();
    }
}

// this should be mostly HUD but also some management
export class QuestLog {
    constructor(){
        this.quests = [];
        this.noQuests = "No hay mision actual";
        this.numQuests = 0;
        this.actualQuest = -1;
    }

    setQuestHUD(questHud){
        this.questHud = questHud;
    }

    addQuest(quest){
        this.quests.push(quest);
        this.numQuests++;
        this.questHud.Update();
        console.log(this.quests);
        // añadir todos los textos y eso
    }

    advanceQuest(id){
        for(let i = 0; i < this.quests.length; i++){
            if(this.quests[i].id == id){
                this.quests[i].actualObjectiveCompleted = true;
                this.actualQuest = i;
                break;
            }
        }
    }

    ShowQuest(){
        if(this.actualQuest !== -1){
            return {name: this.quests[this.actualQuest].name,
                text: this.quests[this.actualQuest].objectives[this.quests[this.actualQuest].stage], 
                yellowColor: this.quests[this.actualQuest].actualObjectiveCompleted};
        }
        else{
            return {text: this.noQuests, yellowColor: false};
        }
    }

    GetQuest(id){
        for(let i = 0; i < this.quests.length; i++){
            if(this.quests[i].id == id){
                return {quest: this.quests[i], index: i};
            }
        }
    }
}

export class Quest {
    constructor(npc, stages, id, name, objectives){
        this.npc = npc;
        this.stages = stages;
        this.stage = 0;
        this.id = id;
        this.name = name;
        this.objectives = objectives;
        this.actualObjectiveCompleted = false;
        this.finished = false;
        this.acquired = false;
    }

    advanceQuest(){
        if(!this.finished){
            this.stage++;
            if(this.stage >= this.stages) this.finished = true;
            this.actualObjectiveCompleted = false;
        }
    }
}