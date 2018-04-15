class Row extends React.Component {
  row() {
    const row = [];
    this.props.rowArr.forEach((cell, j) => {
      row.push(<Point key={`point${this.props.i}${j}`} i={this.props.i} fog={this.props.fog} j={j} player={this.props.player} >{cell}</Point>);
    });
    return row;
  }
  render() {
    return (
      <div className="row">{this.row()}</div>
    );
  }
}

class Display extends React.Component {
  grid() {
    const grid = [];
    this.props.gridArr.forEach((row, i) => {
      grid.push(<Row key={`row${i}`} fog={this.props.fog} rowArr={row} i={i} player={this.props.player} />);
    });
    return grid;
  }
  render() {
    return (
      <div className="grid">{this.grid()}</div>
    );
  }
}

class Point extends React.Component {
  
  getClass(child) {
    switch(child) {
      case 0:
        return 'dead';
        break;
      case 1:
        return 'alive';
        break;
      case 2:
        return 'health';
        break;
      case 3:
        return 'enemy';
        break;
      case 4:
        return 'portal';
        break;
      case 5:
        return 'player';
        break;
      case 6:
        return 'weapon';
        break;
      case 7:
        return 'boss';
        break;
      case 8:
        return 'foggy';
        break;
      default:
        return '';
        break;
    }
  }
  getFog(fog, fogLevel) {
    if (fog && !(this.props.i <= this.props.player.y + fogLevel && this.props.i >= this.props.player.y - fogLevel && this.props.j <= this.props.player.x + fogLevel && this.props.j >= this.props.player.x - fogLevel)) {
      return {background: 'black'}
    }
  }
  render() {
    return (
      <div className={`cell ${this.getClass(this.props.children)}`} style={this.getFog(this.props.fog, this.props.player.fogLevel)} ></div>
    )
  }
}

// table of contents class with a legend on what each square represents
class Table extends React.Component {
  render() {
    let weapon = '';
    if (this.props.player.attack >= 120) {
      weapon = 'Bazooka';
    } else if (this.props.player.attack >= 80) {
      weapon = 'Shuriken';
    } else if (this.props.player.attack >= 60) {
      weapon = 'Katana';
    } else if (this.props.player.attack >= 30) {
      weapon = 'Nunchucks';
    } else if (this.props.player.attack >= 15) {
      weapon = 'Knuckles';
    } else if (this.props.player.attack >= 5) {
      weapon = 'Fists';
    }
    return (
      <div className="table">
        <div>
          <p>Health - <span className="cell health"></span></p>
          <p>Weapon - <span className="cell weapon"></span></p>
          <p>Enemy - <span className="cell enemy"></span></p>
          <p>Boss - <span className="cell boss"></span></p>
          <p>Portal - <span className="cell portal"></span></p>
          <p>Player - <span className="cell player"></span></p>
          <p>Fog Extension - <span className="cell foggy"></span></p>
        </div>
        <div>Health: {this.props.player.health}</div>
        <div>Weapon: {weapon}</div>
        <div>Level: {this.props.player.level}</div>
        <div>Fog Level: {this.props.player.fogLevel}</div>
        <div>XP: {this.props.player.xp}</div>
        <div>Dungeon: {this.props.level}</div>
        <div>{(this.props.level === 5) && `Boss: ${this.props.boss.health}`}</div>
        <div><button onClick={this.props.handleClick}>Fog</button></div>
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gridArr: this.getEmptyGrid(),
      player: {
        x: null,
        y: null,
        health: 100,
        attack: 5,
        xp: 0,
        level: 1,
        fogLevel: 3,
      },
      enemies: {
        one: {
          attack: 10,
          health: 100,
          x: null,
          y: null,
        },
        two: {
          attack: 9,
          health: 100,
          x: null,
          y: null,
        },
        three: {
          attack: 8,
          health: 100,
          x: null,
          y: null,
        },
        four: {
          attack: 7,
          health: 100,
          x: null,
          y: null,
        },
        five: {
          attack: 6,
          health: 100,
          x: null,
          y: null,
        }
      },
      level: 1,
      boss: {
        health: 20000,
        attack: 50
      },
      fog: true
    };
  }

  // a hard coded grid
  getEmptyGrid() {
    const grid = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,0],
      [0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0],
      [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0],
      [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,0],
      [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0],
      [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];
    return grid;
  }

  // function adds random spice to the hardcoded level
  getLevel() {
    const grid = this.state.gridArr;
    function addRandomRoom() {
      let i = Math.floor(Math.random() * 28) + 1;
      let j = Math.floor(Math.random() * 33) + 1;
      if (grid[i][j] === 1) {
        addRandomRoom();
      }
      if (grid[i+1][j] === 1 || grid[i-1][j] === 1 || grid[i][j+1] === 1 || grid[i][j-1] === 1) {
        grid[i][j] = 1;
      }
    }
    for (let k = 0; k < 400; k++) {
      addRandomRoom();
    }
    return grid;
  }

  // this function helps track each block that is important, like enemies and their health and player and their health
  generateBlocks(block) {
    let grid = this.state.gridArr;
    let i = Math.floor(Math.random() * 28) + 1;
    let j = Math.floor(Math.random() * 33) + 1;
    if (grid[i][j] !== 1) {
      this.generateBlocks(block);
    } else {
      grid[i][j] = block;
      if (block === 5) {
        const player = this.state.player;
        player.x = j;
        player.y = i;
        this.setState({
          player
        })
      } else if (block === 3) {
        const enemies = this.state.enemies;
        if (!enemies.one.x) {
          enemies.one.x = j;
          enemies.one.y = i;
          enemies.one.health = 100 * this.state.level;
        } else if (!enemies.two.x) {
          enemies.two.x = j;
          enemies.two.y = i;
          enemies.two.health = 100 * this.state.level;
        } else if (!enemies.three.x) {
          enemies.three.x = j;
          enemies.three.y = i;
          enemies.three.health = 100 * this.state.level;
        } else if (!enemies.four.x) {
          enemies.four.x = j;
          enemies.four.y = i;
          enemies.four.health = 100 * this.state.level;
        } else if (!enemies.five.x) {
          enemies.five.x = j;
          enemies.five.y = i;
          enemies.five.health = 100 * this.state.level;
        }
      }
      return grid;
    }
  }

  // function for generating random environment
  generateEntities() {
    const grid = this.getLevel();
    // if last level generate a boss
    if (this.state.level === 5) {
      this.generateBlocks(7);
    }

    // generate enemies
    for (let i = 0; i < 5; i++) {
      this.generateBlocks(3);
    }

    // generate health packets
    for (let i = 0; i < 7; i++) {
      this.generateBlocks(2);
    }

    // generate player
    this.generateBlocks(5);

    // generate portal
    if (this.state.level < 5) {
      this.generateBlocks(4);
    }

    // generate weapon
    this.generateBlocks(6);

    // generate fog extension pick-up
    if (this.state.level !== 5) {
      this.generateBlocks(8);
    }
    return grid;
  }

  // reset game
  gameReset(player, enemies, boss) {
    // reset enemies
    for (let enemy in enemies) {
      enemies[enemy] = {
        health: 100,
        attack: 10,
        x: null,
        y: null,
      }
    }

    // reset player and boss
    player.x = null;
    player.y = null;
    player.health = 100;
    player.attack = 5;
    player.xp = 0;
    player.level = 1;
    player.fogLevel = 3;
    boss.health = 20000;

    this.setState({
      boss,
      player,
      enemies,
      level: 1,
      gridArr: this.getEmptyGrid()
    });
    this.generateLevel();
  }

  // go to the next level
  nextLevel(player, enemies, level){
    // reset enemies
    for (let enemy in enemies) {
      enemies[enemy] = {
        health: 100,
        attack: 10,
        x: null,
        y: null,
      }
    }

    // add health
    player.health += 50;
    this.setState({
      player,
      enemies,
      level: level + 1,
      gridArr: this.getEmptyGrid()
    });
    this.generateLevel();
  }

  // fight enemy
  fightEnemy(enemyNumber, player, enemies, grid, level, boss, direction) {
    enemies[enemyNumber].health -= Math.floor((Math.random() * player.attack * level * player.level) + 7);
    player.health -= Math.floor((Math.random() * enemies[enemyNumber].attack * level) + 2 * level);
    this.setState({
      player,
      enemies
    });
    
    // check enemies health and move to it's place if dead
    if (enemies[enemyNumber].health <= 0) {
      if (direction === 'left') {
        grid[player.y][player.x - 1] = 5;
        grid[player.y][player.x] = 1;
        player.x = player.x - 1;
      } else if (direction === 'right') {
        grid[player.y][player.x + 1] = 5;
        grid[player.y][player.x] = 1;
        player.x = player.x + 1;
      } else if (direction === 'up') {
        grid[player.y - 1][player.x] = 5;
        grid[player.y][player.x] = 1;
        player.y = player.y - 1;
      } else if (direction === 'down') {
        grid[player.y + 1][player.x] = 5;
        grid[player.y][player.x] = 1;
        player.y = player.y + 1;
      } else {
        return;
      }

      // add xp to the player if enemy defeated
      player.xp += 10 * level;
      if (player.xp >= 50) {
        player.level++;
        player.xp -= 50;
      }

      this.setState({
        gridArr: grid,
        player,
        enemies
      });
    }

    // reset game if player died
    if (player.health <= 0) {
      alert('YOU LOST');
      this.gameReset(player, enemies, boss);
    }
  }

  // fight the boss
  fightBoss(boss, player, enemies, level) {
    boss.health -= Math.floor((Math.random() * player.attack * level * player.level) + 7);
    player.health -= Math.floor((Math.random() * boss.attack) + 20);
    this.setState({
      player,
      boss
    });

    // reset the game if player won
    if (boss.health <= 0) {
      alert('YOU WON');
      this.gameReset(player, enemies, boss);
    }

    // reset the game if player lost
    if (player.health <= 0) {
      alert('YOU LOST');
      this.gameReset(player, enemies, boss);
    }
  }

  // move player in a given direction and pick up a weapon or health if it's there
  moveBlock(grid, player, level, direction, item) {
    switch (direction) {
      case 'left':
        grid[player.y][player.x - 1] = 5;
        grid[player.y][player.x] = 1;
        player.x = player.x - 1;
        break;
      case 'right':
        grid[player.y][player.x + 1] = 5;
        grid[player.y][player.x] = 1;
        player.x = player.x + 1;
        break;
      case 'up':
        grid[player.y - 1][player.x] = 5;
        grid[player.y][player.x] = 1;
        player.y = player.y - 1;
        break;
      case 'down':
        grid[player.y + 1][player.x] = 5;
        grid[player.y][player.x] = 1;
        player.y = player.y + 1;
        break;
    }
    if (item === 'weapon') {
      player.attack += 10 * level;
    } else if (item === 'health') {
      player.health += Math.floor((Math.random() * 15) + 5 + level);
    } else if (item === 'fog') {
      player.fogLevel++;
    }
    
    this.setState({
      gridArr: grid,
      player
    })
  }

  keyPress(e) {
    const grid = this.state.gridArr;
    const player = this.state.player;
    const enemies = this.state.enemies;
    let level = this.state.level;
    const boss = this.state.boss;
    switch(e.keyCode) {
      case 37:
        //move left
        // replace player block with blank and vice versa
        let leftBlock = grid[player.y][player.x - 1];
        if (leftBlock === 1) {
          this.moveBlock(grid, player, level, 'left');

          // pick up health
        } else if (leftBlock === 2) {
          this.moveBlock(grid, player, level, 'left', 'health');
          
          // fight enemy
        } else if (leftBlock === 3) {
          let enemyNumber = '';
          for (let enemy in enemies) {
            if (enemies[enemy].x === player.x - 1 && enemies[enemy].y === player.y) {
              enemyNumber = enemy;
            }
          }
          this.fightEnemy(enemyNumber, player, enemies, grid, level, boss, 'left');
          
          // go to next level
        } else if (leftBlock === 4) {
          this.nextLevel(player, enemies, level);

          // pick up a weapon
        } else if (leftBlock === 6) {
          this.moveBlock(grid, player, level, 'left', 'weapon');

          // fight boss
        } else if (leftBlock === 7) {
          this.fightBoss(boss, player, enemies, level);

          // pick up fog extension
        } else if (leftBlock === 8) {
          this.moveBlock(grid, player, level, 'left', 'fog');
        }
        break;
      case 38:
        //move up
        let upBlock = grid[player.y - 1][player.x];
        if (upBlock === 1) {
          this.moveBlock(grid, player, level, 'up');

          // pick up health
        } else if (upBlock === 2) {
          this.moveBlock(grid, player, level, 'up', 'health');

          // fight enemy
        } else if (upBlock === 3) {
          let enemyNumber = '';
          for (let enemy in enemies) {
            if (enemies[enemy].x === player.x && enemies[enemy].y === player.y - 1) {
              enemyNumber = enemy;
            }
          }
          this.fightEnemy(enemyNumber, player, enemies, grid, level, boss, 'up');

          // got to the next level
        } else if (upBlock === 4) {
          this.nextLevel(player, enemies, level);

          // pick up a weapon
        } else if (upBlock === 6) {
          this.moveBlock(grid, player, level, 'up', 'weapon');

          // fight boss
        } else if (upBlock === 7) {
          this.fightBoss(boss, player, enemies, level);

          // pick up fog extension
        } else if (upBlock === 8) {
          this.moveBlock(grid, player, level, 'up', 'fog');
        }
        break;
      case 39:
        //move right
        let rightBlock = grid[player.y][player.x + 1];
        if (rightBlock === 1) {
          this.moveBlock(grid, player, level, 'right');

          // pick up health
        } else if (rightBlock === 2) {
          this.moveBlock(grid, player, level, 'right', 'health');

          // fight enemy
        } else if (rightBlock === 3) {
          let enemyNumber = '';
          for (let enemy in enemies) {
            if (enemies[enemy].x === player.x + 1 && enemies[enemy].y === player.y) {
              enemyNumber = enemy;
            }
          }
          this.fightEnemy(enemyNumber, player, enemies, grid, level, boss, 'right');

          // move on to the next level
        } else if (rightBlock === 4) {
          this.nextLevel(player, enemies, level);

          // pick up weapon
        } else if (rightBlock === 6) {
          this.moveBlock(grid, player, level, 'right', 'weapon');

          // fight boss
        } else if (rightBlock === 7) {
          this.fightBoss(boss, player, enemies, level);

          // pick up fog extension
        } else if (rightBlock === 8) {
          this.moveBlock(grid, player, level, 'right', 'fog');
        }
        break;
      case 40:
        //move down
        let downBlock = grid[player.y + 1][player.x];
        if (downBlock === 1) {
          this.moveBlock(grid, player, level, 'down');

          // pick up health
        } else if (downBlock === 2) {
          this.moveBlock(grid, player, level, 'down', 'health');

          // fight enemy
        } else if (downBlock === 3) {
          let enemyNumber = '';
          for (let enemy in enemies) {
            if (enemies[enemy].x === player.x && enemies[enemy].y === player.y + 1) {
              enemyNumber = enemy;
            }
          }
          this.fightEnemy(enemyNumber, player, enemies, grid, level, boss, 'down');

          // move on to the next level
        } else if (downBlock === 4) {
          this.nextLevel(player, enemies, level);
          
          // pick up weapon
        } else if (downBlock === 6) {
          this.moveBlock(grid, player, level, 'down', 'weapon');

          // fight boss
        } else if (downBlock === 7) {
          this.fightBoss(boss, player, enemies, level);

          // pick up for extension
        } else if (downBlock === 8) {
          this.moveBlock(grid, player, level, 'down', 'fog');
        }
        break;
      default: 
        return;
    }
  }

  // function for generating random enemies and their position
  generateLevel() {
    const grid = this.generateEntities();;
    this.setState({
      gridArr: grid,
    })
  }
  
  // adds level generation and event listener for the game
  componentWillMount() {
    this.generateLevel();
    window.addEventListener('keyup', this.keyPress.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyPress.bind(this));
  }
  
  // controls the appearance of the fog
  handleClick(){
    this.setState({
      fog: !this.state.fog
    });
  }

  render(){
    return (
      <div className="wrapper">
        <Display 
          gridArr={this.state.gridArr} 
          fog={this.state.fog} 
          player={this.state.player} 
        />
        <Table 
          handleClick={this.handleClick.bind(this)} 
          boss={this.state.boss} 
          level={this.state.level} 
          player={this.state.player} 
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
