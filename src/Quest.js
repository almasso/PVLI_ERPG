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
            this.scene.questHud.Update();
            console.log(this.quest);
            this.quest.acquired = true;   
        }
    }

    advanceQuest(){
        console.log("TERMINO ?: " + this.quest.finished);
        console.log("Stages ?: " + this.quest.stages);
        console.log("stage act ?: " + this.quest.stage);
        this.quest.advanceQuest(this.quest.id);
        this.scene.questHud.Update();
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
                break;
            }
        }
    }

    ShowQuest(){
        if(this.actualQuest !== -1){
            return this.quests[this.actualQuest].objectives[this.quests[this.actualQuest].stage];
        }
        else{
            return this.noQuests;
        }
    }

    GetQuest(id){
        for(let i = 0; i < this.quests.length; i++){
            if(this.quests[i].id == id){
                return this.quests[i];
            }
        }
    }
}

export class Quest {
    constructor(npc, stages, id, objectives){
        this.npc = npc;
        this.stages = stages;
        this.stage = 0;
        this.id = id;
        this.objectives = objectives;
        this.actualObjectiveCompleted = false;
        this.finished = false;
        this.acquired = false;
    }

    advanceQuest(){
        if(!this.finished){
            this.stage++;
            if(this.stage >= this.stages) this.finished = true;
            this.setCurrentObjectives();
            this.actualObjectiveCompleted = false;
        }
    }

    setCurrentObjectives(){
        if(!this.finished){
            this.currentObjectives = this.objectives[this.stage];
        }
        else{
            this.currentObjectives = "QUEST COMPLETE";
        }
    }
}