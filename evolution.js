//function Toolbox() {
//    this.genIndv = function() {};
//    this.getFitness = function() {};
//    this.mutate = function() {};
//    this.goalFitness = Toolbox.fitnessMax;
//    this.mutAmount = function(){};
//    this.len = 0;
//};
//
//Toolbox.fitnessMax = 1;
//Toolbox.fitnessMin = -1;
//
//function GeneticAlgorithm(toolbox, popSize, mutProb, breedFunction, verbose = false) {
//
//    checkConstructorVars(toolbox, popSize, mutProb, breedFunction);
//
//    function checkConstructorVars(toolbox, popsize, mutProb, breedFunction) {
//        if(toolbox === undefined) {
//            throw 'Toolbox must be defined';
//        }
//
//        if(popSize === undefined) {
//            throw 'Population size must be defined';
//        }
//
//        if (popSize <= 2) {
//            throw 'Population size must be greater than 2. Current size: ' + popSize;
//        }
//
//        if(mutProb === undefined) {
//            throw 'Mutability probability must be defined';
//        }
//
//        if(breedFunction === undefined) {
//            throw 'Breed function must be defined';
//        }
//    };
//
//    
//
//    this.evolve = function(generations) {
//        let mutationInd = toolbox.mutAmount;
//        let population = this.generatePopulation(popSize, toolbox.len, mutationInd);
//        population = this.getFitness(population, mutationInd);
//
//        for(let i =0; i < popSize; i++){
//             console.log("INDIVID "+ population[i].individual);
//             console.log("FITNESS IS "+population[i].fitness);
//            console.log("MUTATED INDEDX " +population[i].mutatedIndex);
//        }
//       
//        console.log("NEUTRAL "+mutationInd.neutral);
//        console.log("PATOHENIC "+mutationInd.patohenic);
//
//        
//
//        for (var i = 0; i < generations; i++) {
////            population = this.getFitness(population, toolbox.getFitness);
////            population = this.sortByFitness(population, toolbox.getFitness, toolbox.goalFitness);
//
//            if (verbose) printUpdate(population, i);
//            population = breed(population, toolbox.mutate, mutProb, breedFunction, mutationInd);
//            let wildType = getWildType(population);
//            console.log("WILD TYPE IS: "+wildType);
//        }
////        population = this.sortByFitness(population, toolbox.getFitness, toolbox.goalFitness);
////        if (verbose) printUpdate(population, generations);
//
//        let results = getResults(population, generations);
//        return results;
//    };
//
//
//    // Generate a population with the given individual 
//    // generation strategy and population size
//    this.generatePopulation = function(popSize, l, mutationInd) {
//        let pop = [];
//        for (var i = 0; i < popSize; i++) {
//            let generInd = generateIndividual(l, mutationInd);
//            
//            let indv = { individual: generInd.indiv,
//                       mutatedIndex: generInd.mutatedInd}
//            pop.push(indv);
//        }
//        return pop;
//    };
////d----------------------------------------------------------------------HERE-----------------------------------
//    
//    this.getFitness = function(population, mutationInd) {
//        for (var i = 0; i < population.length; i++){
//            let indv = population[i];
//            indv.fitness = checkMutation(indv, mutationInd).fitness;
//            
//            population[i] = indv;
//        }
//        return population;
//    }
//
//    // Sort the population array
//    this.sortByFitness = function(population, getFitness, goalFitness) {
//        population.sort(function(a, b) {
//            return (b.fitness - a.fitness) * goalFitness;
//        });
//        return population;
//    };
//
//    // breed population and apply mutation if probability met
//    function breed(population, mutate, mutProb, breedFunction, mutationInd) {
//
//        // Select best individuals and remove bottom half of population
////        let breeders = Math.round(population.length / 2);
//         let newPopulation = [];
//
//        // Select parents
//        while (newPopulation.length != population.length) {
//            let parentAIndex = Math.floor(Math.random() * population.length);
//            let parentBIndex = Math.floor(Math.random() * population.length);
//
//            while (parentAIndex == parentBIndex) {
//                parentBIndex = Math.floor(Math.random() * population.length);
//            }
//
////            let parentA = population[parentAIndex].individual;
////            let parentB = population[parentBIndex].individual;
////            
////            let parentAfit = population[parentAIndex].fitness;
////            let parentBfit = population[parentBIndex].fitness;
////            console.log(parentBfit+ "fitness!!!!!");
//            let parentA = population[parentAIndex];
//            let parentB = population[parentBIndex];
//            // Create newborn
//            let newborn = breedFunction(parentA, parentB);
//
//            // Mutate newborn & change fitness value of individual
//                newborn = mutate(newborn, mutProb);
//                //now newborn is:
//                //[object Object] {
//                //  fitness: 10,
//                //  individual: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
//                //  mutatedIndex: 10
//                //}
////check if mutation is neutral etc.
//            newborn = checkMutation(newborn, mutationInd);
//            
////            console.log(newborn);
//            newPopulation.push({ individual: newborn.individual, fitness: newborn.fitness });
//        }
//        return newPopulation;
//    };
//
//
//function getWildType(population){
//    let indivLength = population[0].individual.length;
//    var initialValue = Array(indivLength).fill(0);
//
//    const reducer = function addition(accumulator, obj){
//      for(let i = 0; i < accumulator.length; i++){
//        accumulator[i] += obj.individual[i];
//      }
//      return accumulator;
//    }
//    var allIndivSum = population.reduce(reducer, initialValue);
//    let half = (population.length/2);
//    let wildType = allIndivSum.map(function(n){
//      n >(half) ? n = 1 : n = 0;
//      return n;
//    })
//return wildType;
//}
//
//    function getResults(population, generations) {
//        let results = {
//            generations: generations,
//            population: []
//        };
//        for (var i = 0; i < population.length; i++) {
//            let indv = population[i];
//            results.population.push(indv);
//        }
//        return results;
//    };
//
//    function printUpdate(population, generation) {
//        let fittestScore = population[0].fitness;
//        let sum = 0;
//        for (var i = 0; i < population.length; i++) {
//            sum += population[i].fitness;
//        }
//        let average = sum / population.length;
//        console.log("Generation:", generation, "Fittest:", fittestScore, "Average:", average);
//    };
//};
//
//function Algorithms() {};
//
//Algorithms.crossBreed = function(parentA, parentB) {
//    // Select cutOff point and create newborn
//    let cutOff = Math.floor(Math.random() * parentA.length);
//    let newborn = parentA.slice(0, cutOff + 1);
//    let parentBChrom = parentB.slice(cutOff + 1, parentB.length);
//
//    for (var i = 0; i < parentBChrom.length; i++) {
//        newborn.push(parentBChrom[i]);
//    }
////    console.log(newborn);
//    return newborn;
//}
//
//function tournament2 (parentA, parentB){
//    let newborn = 0;
//    parentA.fitness > parentB.fitness ? newborn = parentA : newborn = parentB;
//    return newborn;
//}
//
//
////function fitnessDefining(){
////    
////}
//
//
////ME CODE
//
//
//// Create parameters
//var popSize = 100;
//var mutProb = 0.00006116085;
//var generations = 1000;
//var breedFunction = tournament2;
//var l = 100; 
//
//
//var toolbox = new Toolbox();
//toolbox.genIndv = generateIndividual;
//toolbox.getFitness = checkMutation;
//toolbox.goalFitness = Toolbox.fitnessMax;
//toolbox.mutate = mutate;
//toolbox.mutAmount = mutationAmount(l);
//toolbox.len = l;
//
//
////-----------------------------------
//
//
//function mutationAmount (l){
//    
//        let result = {
//            neutral: [],
//            patohenic:[]
//        };
//        let amount = 0.053 * l;
//        for(let i =0; i< amount; i++){
//            result.neutral.push(i);
//        }
//        let amount2 = 0.3577*l;
//        let limit = amount2 + result.neutral.length;
//        while(result.neutral.length < limit){
//            randNum = Math.floor(Math.random() * l);
//            if(result.neutral.indexOf(randNum) == -1){
//                result.neutral.push(randNum);
//            }
//        }
//        
//        let patohenicAmount =  0.0232*l;
//       let limit2 = limit + patohenicAmount;
//        while(result.patohenic.length < patohenicAmount){
//            randNum = Math.floor(Math.random() * l);
//            if(result.neutral.indexOf(randNum) == -1 && result.patohenic.indexOf(randNum) == -1 ){
//                result.patohenic.push(randNum);
//            }
//        }
//  return result;
//
//        
//};
//
//function checkMutation(indv, mutationInd){
//    if(indv.mutatedIndex.length != 0){
//       let newIndw = indv.mutatedIndex;
//      let counter = newIndw.length;
//  let neutral = newIndw.filter(function(v, index){
//    let b = mutationInd.neutral.some(function(v2){
//      return v == v2;
//    })
//    if(b){
//        counter--;
//       }
//    return b;
//  }); 
//  let patohenic = newIndw.filter(function(v, index){
//    let a = mutationInd.patohenic.some(function(v2){
//      return v == v2;
//    })
//    if(a){
//        counter--;
//       }
//    return a;
//  }); 
//  if(counter > 0){
//    indv.fitness = 0.1 ;
//  }else if(patohenic.length >0){
//    indv.fitness = (indv.individual.length - (10 * patohenic.length));
//  }else{
//    indv.fitness = indv.individual.length;
//  }
//    }else{
//        indv.fitness = indv.individual.length;
//    }
//  return indv;
//    }
//    
//    
////    
////    
////     if(mutationInd.neutral.includes(newborn.mutatedIndex)){
////                newborn.fitness = newborn.fitness;
////            }else if(mutationInd.patohenic.includes(newborn.mutatedIndex)){
////                newborn.fitness = newborn.fitness - (newborn.individual.length - 10);
////            }else{
////                newborn.fitness = 0.1;
////            }
////                console.log(newborn);
////}
//
//
//function generateIndividual(l, mutationInd){
//    let res = {
//        indiv : [],
//        mutatedInd : []
//    }
//	let array = [];
//	for(var i = 0; i < l; i++){
//       var rand = 0;
//       for (var j = 0; j < 3; j += 1) {
//        rand += Math.random();
//        }
//        let allelValue = Math.round(rand / 3);
//        if(allelValue == 1){
//            if(mutationInd.neutral.includes(i)){
//                allelValue = allelValue;
//                res.mutatedInd.push(i);
//        }else{
//            allelValue = 0;
//        }
//    res.indiv.push(allelValue);
//    }}
//	return res;
//}
//
//function getFitness(indv) {
//	let fitness = 0;
//	for(var i = 0; i < indv.length; i++) {
//		fitness += indv[i] == 1 ? 0 : 1;
//	}
//	return fitness;
//}
//
//function mutate(indv, mutProb) {
//    let result = {
//        mutatedIndex: [],
//        individual: indv.individual,
//        fitness: indv.fitness
//    }
//    result.individual.forEach(function(n, index){
//        if(Math.random() <= mutProb){
//            n == 1? result.individual[index]= 0 : result.individual[index]= 1 && result.mutatedIndex.push(index);
//            }
//    });
//  return result;
//}
//
//
//
//
//// Create genetic algorithm and evolve individuals
//var gen = new GeneticAlgorithm(toolbox, popSize, mutProb, breedFunction, true);
//console.log("Simple Array Example:", gen.evolve(generations));


