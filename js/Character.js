
//var CharacterModel =
//{
//    "baseFp": 0
//    ,"fp": 0
//    ,"turnPriority": 0
//    ,"posture": "standing"

//    ,"movement":
//    {
//        // Movement object should look like this
//        "sit": 0
//        ,"stand": 0
//        ,"roll": 0
//        ,"slither": 0
//        ,"crawl": 0
//        ,"run": 0
//        ,"fly": 0
//        ,"swim": 0
//        ,"warp": 0
//        ,"collisions": false
//    }

//    ,"activeDefenses":
//    {
//        "baseDodge": 0
//        ,"baseParry": 0
//        ,"baseBlock": 0
//    }

//    ,"passiveDefenses":
//    {
//        "baseHp": 0
//        ,"hp": 0 
//        ,"baseHpRecovery": 0 // per round
        
//        ,"damageSubractors": 
//        {
//            "burn": 0
//            ,"crush": 0
//            ,"pierce": 0
//            ,"cut": 0
//            ,"toxic": 0
//            ,"corrosive": 0
//            ,"fatigue": 0
//            ,"cosmic": 0
//        }
        
//        //  probably want to avoid using this mechanic
//        //,"damageMultipliers": 
//        //{
//        //    "burn": 1
//        //    ,"crush": 1
//        //    ,"pierce": 1
//        //    ,"cut": 1
//        //    ,"toxic": 1
//        //    ,"corrosive": 1
//        //    ,"fatigue": 1
//        //    ,"cosmic": 1
//        //}

//        //  resistances are a percentage decrease in duration
//        ,"resistances": 
//        {
//            "movement": 
//            {
//                "sit": 0
//                ,"stand": 0
//                ,"roll": 0
//                ,"slither": 0
//                ,"crawl": 0
//                ,"run": 0
//                ,"fly": 0
//                ,"swim": 0
//                ,"warp": 0
//                ,"collisions": 0
//            }
//            ,"controls": 0
//            ,"ui": 0
            
//            ,"activeDefenses":
//            {
//                "baseDodge": 0
//                ,"baseParry": 0
//                ,"baseBlock": 0
//            }

//            ,"passiveDefenses":
//            {
//                "baseHp": 0
//                ,"baseHpRecovery": 0 // per round
        
//                ,"damageSubractors": 
//                {
//                    "burn": 0
//                    ,"crush": 0
//                    ,"pierce": 0
//                    ,"cut": 0
//                    ,"toxic": 0
//                    ,"corrosive": 0
//                    ,"fatigue": 0
//                    ,"cosmic": 0
//                }
        
//                /*  this is how much the entity resists having its resistances changed.
//                    Maybe I wont use this
//                */
//                ,"resistances": 0
//                /*
//                {
//                    "controls": 0
//                    ,"ui": 0
                    
//                    ,"movement": 
//                    {
//                        "sit": 0
//                        ,"stand": 0
//                        ,"roll": 0
//                        ,"slither": 0
//                        ,"crawl": 0
//                        ,"run": 0
//                        ,"fly": 0
//                        ,"swim": 0
//                        ,"warp": 0
//                        ,"ignoreObstructions": 0
//                    }
                    
//                    ,"activeDefenses":
//                    {
//                        "baseDodge": 0
//                        ,"baseParry": 0
//                        ,"baseBlock": 0
//                    }

//                    ,"passiveDefenses":
//                    {
//                        "baseHp": 0
//                        ,"baseHpRecovery": 0 // per round
        
//                        ,"damageSubractors": 
//                        {
//                            "burn": 0
//                            ,"crush": 0
//                            ,"pierce": 0
//                            ,"cut": 0
//                            ,"toxic": 0
//                            ,"corrosive": 0
//                            ,"fatigue": 0
//                            ,"cosmic": 0
//                        }
//                    }
//                }
//                */

//            }
//        }
//    }

//    ,"actions": []

//    ,"effects":
//    {
//        "beginningOfTurnEffects": function(){}
//        ,"actionEffects": function(){}
//        ,"defenseEffects": function(){}
//        ,"movementEffects": function(){}
//        ,"endOfTurnEffects": function(){}
//        ,"persistentEffects": function(){}
//    }
//};

//var CharacterController = 
//{
//    /*
//    canMove
//    I determine if the object can move the specified distance using the specified movement type
//    model = im the moving object
//    distance = im the number of hexes or units of distance traversed, i should be coming from the GridController.  
//               Before getting here, you should already have checked if the destination tile is accessible and valid for the target model.
//    type = im the type of movement to use
//    */
//    "canMove": function (model, distance, type) 
//    {
//        var movement = 0;

//        if(type === "Any")
//        {
//            movement = this.getHighestMovement();
//        }
//        else
//        {
//            movement = model.movement[type];
//        }

//        if (movement >= distance)
//        {
//            return true;
//        }
//        else
//        {
//            return false;
//        }
//    }

    ///*
    //moveTo
    //I check if the target tile is a valid selection and if the target item to move can perform the action
    //*/
    //, "moveTo": function (item, x, y, distance, type)
    //{
    //    if (item.movement[type] >= distance)
    //    {
    //        this.setPosition(item, x, y);
    //    }
    //    else
    //    {
    //        //  out of range
    //        alert("out of range");
    //    }

    //    return item;
    //}

//    , "getHighestMovement": function()
//    {
//        var highest = 0;
//        for(var i = 0; i < model.movement.length; i ++)
//        {
//            highest = model.movement[i] > highest ? model.movement[i] : highest;
//        }

//        return highest;
//    }

//    ,"takeDamage": function(model, amount, type)
//    {
//        var injury = this.calcInjury(model.passiveDefenses.damageSubtractors[type], model.passiveDefenses.damageMultipliers[type]);
//        return this.setCurrentHp(model, injury);
//    }

//    /*
//    setCurrentHp
//    let's make sure we don't set hp to more than the max.
//    probably also want to make sure it isn't below 0;
//    */
//    , "setCurrentHp": function(model, value)
//    {
//        value = value > 0 ? value : 0;
//        model.passiveDefenses.hp = (value > model.passiveDefenses.baseHp) ? model.passiveDefenses.baseHp : value;
//        return model;
//    }

//    /*
//    calcInjury
//    I subtract before multiplying because the other way gives free protection to things
//    */
//    , "calcInjury": function(damage, subtractor, multiplier)
//    {
//        return (damage - subtractor) * multiplier;
//    }
//}

///*
//EffectListModel

//This contains a list of effects that run when a trigger occurs.
//*/

//var EffectListModel =
//{
//    "effects": []

//    ,"getEffects": function ()
//    {
//        return EffectListModel.effects;
//    }

//    ,"setEffects": function (value)
//    {
//        EffectListModel.effects = value;
//    }

//}

//EffectListModel.prototype.add(object.create(ListModelController));


//var ListModelController =
//{
//    "add": function (value)
//    {
//        EffectListModel.effects.push(value);
//    }

//    ,"addUnique": function (value)
//    {
//        var push = true;

//        for (var i = 0; i < EffectListModel.effects.length; i++)
//        {
//            if (EffectListModel.effects[i].id == value.id)
//            {
//                EffectListModel.effects[i] = value;
//                push = false;
//            }
//        }

//        if (push)
//        {
//            EffectListModel.effects.push(value);
//        }
//    }

//    ,"remove": function (id)
//    {
//        for (var i = 0; i < EffectListModel.effects.length; i++)
//        {
//            if (EffectListModel.effects[i].id == id)
//            {
//                EffectListModel.effects.splice(i 1);
//            }
//        }
//    }

//    ,"removeAt": function (ndx)
//    {
//        EffectListModel.effects.splice(ndx 1);
//    }

//}

///*

//EffectModel

//This contains things like status effects

//examples: 
//character takes damage every end of turn
//character has increased defense
//character damages everything in a 1 space radius when character receives damage


//name = the name of the effect. This will be displayed to the user so it should have meaning.
//duration = the number of turns the effect will last.  0 means it is an instant effect.
//range = the number of spaces from the user that the effect can originate
//radius = the area of effect.  a radius of 1 includes the space that contains the effect origin and all adjacent spaces.  
//a radius of .5 means only the origin space is affected.  a radius of 0 means on the point target is affected.

//trigger = this is the condition that causes the effect to occur.  It can be "attack" "defend" "receive damage" "move" "begin turn" "end turn" etc
//effectLogic = this is a collection of values that are applied to the target of the effect.  or a routine that occurs when triggered
//effectAnimation = this is the animation for the effect


//*/

//var EffectModel =
//{
//    "id": 0
//    "name": ""
//    "duration": 0
//    "range": 0
//    "radius": 0
//    "trigger": ""
//    "effectLogic": {}
//    "effectAnimation": {}
//}

//EffectModel.prototype =
//{
//}

//var CombatLogic =
//{

//}












///*

//Animations

//This is a list of different animations.  
//Maybe I should figure out how to draw stuff in js and actually write the animations.

//*/
//var Animations =
//{
//    "idle": {}
//    "walk": {}
//    "run": {}
//    "recoil": {}
//    "fall": {}
//    "fallForward": {}
//    "fallBackward": {}
//    "getUpFromProne": {}
//    "getUpFromSupine": {}
//    "kipUp": {}
//    "attackSequence": {}
//    "sheatheWeapon": {}
//    "punch": {}
//    "kick": {}
//    "throwPerson": {}
//    "throwSmallObject": {}
//    "throwLargeObject": {}
//    "castSpell": {}
//    "recoilFromCast": {}
//    "recoilFromAttack": {}
//    "sit": {}
//    "lieDown": {}
//    "diveProne": {}
//    "diveRoll": {}
//    "roll": {}
//    "block": {}
//    "dodge": {}
//    "explode": {}

//}













///*
//VectorAnimationModel

//This represents an animation
//span = the number of ms that will span the animation
//cancelable = this boolean indicates whether or not the animation can be interrupted by other animations
//animate() = the animation logic.  It requires a span for timing and a boolean for cancelability
//*/
//var VectorAnimationModel =
//{
//    "span": 0
//    "cancelable": false
//    "animate": function () { }

//}

//var VectorAnimationController =
//{
//    "getSpan": function ()
//    {
//        return VectorAnimationModel.span;
//    }

//    "setSpan": function (value)
//    {
//        VectorAnimationModel.span = value;
//    }

//"getPreDelay": function ()
//{
//    return VectorAnimationModel.preDelay;
//}

//"setPreDelay": function (value)
//{
//    VectorAnimationModel.preDelay = value;
//}

//"getPostDelay": function ()
//{
//    return VectorAnimationModel.postDelay;
//}

//"setPostDelay": function (value)
//{
//    VectorAnimationModel.postDelay = value;
//}
//}

//VectorAnimationModel.prototype.run = function (isCancelable)
//{
//    VectorAnimationModel.run(1 isCancelable);
//}

//VectorAnimationModel.prototype.run = function (speedCoefficient isCancelable)
//    {
//        var s = VectorAnimationModel.span * speedCoefficient;

//        VectorAnimationModel.animate(s isCancelable);
//    }










//    /*
//    IVectorAnimated
    
//    This interface is for things that have a sequence of animations that transition into each other.
    
//    */
//    var IVectorAnimated =
//    {
//        "animationSequence": []

//        "getAnimationSequence": function ()
//        {
//            return IVectorAnimated.animationSequence;
//        }

//    "setAnimationSequence": function (value)
//    {
//        IVectorAnimated.animationSequence = value;
//    }
//}

//IVectorAnimated.prototype.addAnimation = function (addMe ndx)
//    {
//        IVectorAnimated.animationSequence.splice(ndx 0 addMe);
//    }

//    IVectorAnimated.prototype.removeAnimation = function (ndx)
//    {
//        IVectorAnimated.animationSequence.splice(ndx 1);
//    }

//    IVectorAnimated.prototype.runAnimationSequence = function (speedCoefficient)
//    {
//        for (animation in animationSequence)
//        {
//            animation.run(speedCoefficient);
//        }
//    }

//    IVectorAnimated.prototype.runAnimationSequence = function ()
//    {
//        for (animation in animationSequence)
//        {
//            animation.run();
//        }
//    }











//    /*
    
//    MovementModel
    
//    speed = the number of units of distance that the movement can traverse in a fixed span of time.
//    Lets shoot for m/s
    
//    animation = the method for drawing the movement
    
//    */
//    var MovementModel =
//    {
//        "speed": 0
//        "animationSequence": {}

//"getSpeed": function ()
//{
//    return MovementModel.speed;
//}

//"setSpeed": function (value)
//{
//    MovementModel.speed = value;
//}

//"getAnimationSequence": function ()
//{
//    return MovementModel.animationSequence;
//}

//"setAnimationSequence": function (value)
//{
//    MovementModel.animationSequence = value;
//}
//}

//MovementModel.prototype.animate = function (time)
//{
//    MovementModel.animation.animate(time);
//}




//var GameObject =
//{
//    "x": 0
//    "y": 0

//    "getX": function ()
//    {
//        return gameObject.x;
//    }

//"setX": function (value)
//{
//    gameObject.x = value;
//}

//"getY": function ()
//{
//    return gameObject.y;
//}

//"setY": function (value)
//{
//    gameObject.y = value;
//}

//}

///*
//Grid contains a two dimensional data structure and logic to manage it.

//*/
//var Grid =
//{
//    "Spaces": 
//    {
//        "storage": []
        
//        "list": []
//        "rows": []
//        "columns": []
//}

//}

///*
//TesselatedHexGrid contains the presentation logic that turns a two dimensional array into a hex grid

//*/
//var TesselatedHexGrid =
//{

//}