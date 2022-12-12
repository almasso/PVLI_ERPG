import NPC from './obj/npc.js'

export class QuestNPC extends NPC {
    constructor(scene, x, y, imageID, npcID, dialogues, manin, quest) {
        super(scene, x, y, imageID, npcID, dialogues, manin);
        this.quest = quest;
    }

    activateQuest(){
        if(!this.quest.acquired){
            this.manin.questLog.addQuest(this.quest);
            this.scene.scene.get('hud').UpdateHUD();
            this.quest.acquired = true;   
        }
    }
    
    advanceQuest(){
        this.quest.advanceQuest(this.quest.id);
        this.manin.questLog.actualQuest = this.manin.questLog.GetQuest(this.quest.id).index; 
        //this.manin.questLog.CompleteQuest(this.quest.id);
        if(this.quest.finished){
            this.manin.questLog.CompleteQuest(this.quest.id);
        }
        this.scene.scene.get('hud').UpdateHUD();
    }
}

// this should be mostly HUD but also some management
export class QuestLog {
    constructor(){
        this.quests = [];
        this.completedQuests = [];
        this.noQuests = "No hay mision actual";
        this.numQuests = 0;
        this.numCompletedQuests = 0;
        this.actualQuest = -1;
    }

    setQuestHUD(questHud){
        this.questHud = questHud;
    }

    addQuest(quest){
        console.log(this.actualQuest + "   " + this.numQuests);
        this.quests.push(quest);
        this.numQuests++;
        this.actualQuest = this.numQuests - 1; 
        console.log(this.actualQuest + "   " + this.numQuests);
        this.questHud.Update();
        console.log(this.quests);
        // añadir todos los textos y eso
    }

    advanceQuest(id){
        console.log(this.actualQuest + "   " + this.numQuests);
        let quest = this.GetQuest(id);
        quest.quest.actualObjectiveCompleted = true;
        this.actualQuest = quest.index;
        console.log(this.actualQuest + "   " + this.numQuests);
    }
    
    CompleteQuest(id){
        console.log(this.actualQuest + "   " + this.numQuests);
        this.numCompletedQuests++;
        this.numQuests--;
        let quest = this.GetQuest(id);
        this.quests.splice(quest.index, 1);
        console.log(this.quests);
        this.completedQuests[this.numCompletedQuests - 1] = quest.quest;
        if(this.actualQuest === quest.index){
            this.actualQuest = 0;
            if(this.quests[this.actualQuest] === undefined) {
                this.actualQuest = -1;
            }
        }
        console.log(this.actualQuest + "   " + this.numQuests);
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