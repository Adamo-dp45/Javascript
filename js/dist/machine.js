function valueEnumerable(value) {
  return { enumerable: true, value };
}

function valueEnumerableWritable(value) {
  return { enumerable: true, writable: true, value };
}

let d = {};
let truthy = () => true;
let empty = () => ({});
let identity = a => a;
let callBoth = (par, fn, self, args) => par.apply(self, args) && fn.apply(self, args);
let callForward = (par, fn, self, [a, b]) => fn.call(self, par.call(self, a, b), b);
let create = (a, b) => Object.freeze(Object.create(a, b));

function stack(fns, def, caller) {
  return fns.reduce((par, fn) => {
    return function(...args) {
      return caller(par, fn, this, args);
    };
  }, def);
}

function fnType(fn) {
  return create(this, { fn: valueEnumerable(fn) });
}

let reduceType = {};
let reduce = fnType.bind(reduceType);

let guardType = {};
let guard = fnType.bind(guardType);

function filter(Type, arr) {
  return arr.filter(value => Type.isPrototypeOf(value));
}

function makeTransition(from, to, ...args) {
  let guards = stack(filter(guardType, args).map(t => t.fn), truthy, callBoth);
  let reducers = stack(filter(reduceType, args).map(t => t.fn), identity, callForward);
  return create(this, {
    from: valueEnumerable(from),
    to: valueEnumerable(to),
    guards: valueEnumerable(guards),
    reducers: valueEnumerable(reducers)
  });
}

let transitionType = {};
let immediateType = {};
let transition = makeTransition.bind(transitionType);
makeTransition.bind(immediateType, null);

function enterImmediate(machine, service, event) {
  return transitionTo(service, machine, event, this.immediates) || machine;
}

function transitionsToMap(transitions) {
  let m = new Map();
  for(let t of transitions) {
    if(!m.has(t.from)) m.set(t.from, []);
    m.get(t.from).push(t);
  }
  return m;
}

let stateType = { enter: identity };
function state(...args) {
  let transitions = filter(transitionType, args);
  let immediates = filter(immediateType, args);
  let desc = {
    final: valueEnumerable(args.length === 0),
    transitions: valueEnumerable(transitionsToMap(transitions))
  };
  if(immediates.length) {
    desc.immediates = valueEnumerable(immediates);
    desc.enter = valueEnumerable(enterImmediate);
  }
  return create(stateType, desc);
}

let invokeFnType = {
  enter(machine2, service, event) {
    let rn = this.fn.call(service, service.context, event);
    if(machine$1.isPrototypeOf(rn))
      return create(invokeMachineType, {
        machine: valueEnumerable(rn),
        transitions: valueEnumerable(this.transitions)
      }).enter(machine2, service, event)
    rn
      .then(data => { 
        if (machine2 === service.machine) 
          return service.send({ type: 'done', data });
      })
      .catch(error => { 
        if (machine2 === service.machine) 
          return service.send({ type: 'error', error });
      });
    return machine2;
  }
};
let invokeMachineType = {
  enter(machine, service, event) {
    service.child = interpret(this.machine, s => {
      service.onChange(s);
      if(service.child == s && s.machine.state.value.final) {
        delete service.child;
        service.send({ type: 'done', data: s.context });
      }
    }, service.context, event);
    if(service.child.machine.state.value.final) {
      let data = service.child.context;
      delete service.child;
      return transitionTo(service, machine, { type: 'done', data }, this.transitions.get('done'));
    }
    return machine;
  }
};
function invoke(fn, ...transitions) {
  let t = valueEnumerable(transitionsToMap(transitions));
  return machine$1.isPrototypeOf(fn) ?
    create(invokeMachineType, {
      machine: valueEnumerable(fn),
      transitions: t
    }) :
    create(invokeFnType, {
      fn: valueEnumerable(fn),
      transitions: t
    });
}

let machine$1 = {
  get state() {
    return {
      name: this.current,
      value: this.states[this.current]
    };
  }
};

function createMachine(current, states, contextFn = empty) {
  if(d._create) d._create(current, states);
  return create(machine$1, {
    context: valueEnumerable(contextFn),
    current: valueEnumerable(current),
    states: valueEnumerable(states)
  });
}

function transitionTo(service, machine, fromEvent, candidates) {
  let { context } = service;
  for(let { to, guards, reducers } of candidates) {  
    if(guards(context, fromEvent)) {
      service.context = reducers.call(service, context, fromEvent);

      let original = machine.original || machine;
      let newMachine = create(original, {
        current: valueEnumerable(to),
        original: { value: original }
      });

      if (d._onEnter) d._onEnter(machine, to, service.context, context, fromEvent);
      let state = newMachine.state.value;
      service.machine = newMachine;
      let ret = state.enter(newMachine, service, fromEvent);
      service.onChange(service);
      return ret;
    }
  }
}

function send(service, event) {
  let eventName = event.type || event;
  let { machine } = service;
  let { value: state, name: currentStateName } = machine.state;
  
  if(state.transitions.has(eventName)) {
    return transitionTo(service, machine, event, state.transitions.get(eventName)) || machine;
  } else {
    if(d._send) d._send(eventName, currentStateName);
  }
  return machine;
}

let service$1 = {
  send(event) {
    send(this, event);
  }
};

function interpret(machine, onChange, initialContext, event) {
  let s = Object.create(service$1, {
    machine: valueEnumerableWritable(machine),
    context: valueEnumerableWritable(machine.context(initialContext, event)),
    onChange: valueEnumerable(onChange)
  });
  s.send = s.send.bind(s);
  s.machine = s.machine.state.value.enter(s.machine, s, event);
  return s;
}

const wait = duration => {
  // On simule un appel a un serveur
  return new Promise((resolve, reject) => {
    window.setTimeout(function () {
      resolve();
    }, duration);
  });
};
const machine = createMachine('edit',
// 'edit' si on veut tester notre machine, on peut lui passer l'état initial en premier paramètre
{
  // -- Schema de notre machine 
  idle: state(
  // Etat
  transition('edit', 'edit') // Permet de passer d'un état à un autre, prend en paramètre un nom et vers quel état je veut partir
  ),
  edit: state(transition('cancel', 'idle'), transition('input', 'edit', reduce((ctx, event) => ({
    // Prend en params le context et l'évènement, en fonction de ça on doit retourner le nouveau context
    ...ctx,
    editedTitle: event.value // title: event.value -- Plutôt que de changer la valeur directement on a sauvegarder une nouvelle valeur pour pouvoir des traitements
  }))),
  // 'reduce' Va être appeler lorsqu'il y'aura un changement d'état
  transition('submit', 'loading', guard(ctx => ctx.editedTitle && ctx.editedTitle !== ctx.title)) // 'guard' prend en params une fonction qui reçoit un context et qui va vérifier si oui ou non on doit faire les choses, donc si on soumet sans changer le titre rien ne vas se passer
  ),
  // Permet d'empêcher une transition sous certaines conditions
  loading: invoke(() => wait(3000),
  // On pourrait réupérer des informations depuis le serveur
  transition('done', 'success'), transition('error', 'edit') // En cas d'erreur
  ),
  // 'invoke' permet de lancer une promesse et lors de la résolution va permettre d'éffectuer une transition, prend en premier params une promesse
  success: state()
}, () => ({
  title: 'Hello'
})); // Prend en deuxième params un context, qui va nous permettre de persisiter les informations et autres, ici une fonction qui renvoi le context car on pourrait l'utiliser dans 'interpret', chaque nouvelle machine aura un context différent

const service = interpret(machine, () => {
  // Créer une nouvelle instance, prend en deuxième params une fonction qui permet d'écouter les changements de la machine
  console.log('Etat : ', service.machine.current), console.log('Context : ', service.context);
}); // --- Mise en application, on peut directement dans la onChange de service rajouter des comportements particulier pour pouvoir modifier le DOM, affecté des choses ou utiliser ce système directement dans des framework comme react ou autre 

console.log(service, service.machine.current // Notre état actuel 'idle'
);
service.send('edit'); // Permet de déclancher une transition, si on n'est dans edit et qu'on vas vers le même edit rien ne vas changer car on n'est dans le même état
console.log(service.machine.current); // On sera dans l'état 'edit'
// service.send('cancel') -- Car si je cancel on ne pourra pas passer à l'état 'loading' depuis 'idle'
// console.log(service.machine.current) -- Va revenir dans l'état 'idle'
service.send({
  type: 'input',
  value: 'Nouveau titre'
}); // Permet de changer le titre
service.send('submit');
console.log(service.machine.current); // On sera dans l'état 'loading' si on change le titre car on a un mis un guard

window.send = service.send; // Nous permettra de pouvoir envoyer des infos depuis le terminal comme un 'send('input')'
// send({type: 'input', value: 'Nouveau titre'}) -- Changera le titre dans le context de ma machine

// npx rollup -c rollup.config.js --watch
