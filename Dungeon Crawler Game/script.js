class Row extends React.Component {
  row() {
    const row = [];
    this.props.rowArr.forEach((cell, j) => {
      row.push(<Point key={`point${this.props.i}${j}`} i={this.props.i} j={j} >{cell}</Point>);
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
      grid.push(<Row key={`row${i}`} rowArr={row} i={i} />);
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
      default:
        return '';
        break;
    }
  }
  render() {
    return (
      <div className={`cell ${this.getClass(this.props.children)}`}></div>
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
        level: 1
      },
      enemies: {
        one: {
          attack: 10,
          health: 100,
          x: null,
          y: null,
        },
        two: {
          attack: 10,
          health: 100,
          x: null,
          y: null,
        },
        three: {
          attack: 10,
          health: 100,
          x: null,
          y: null,
        },
        four: {
          attack: 10,
          health: 100,
          x: null,
          y: null,
        },
        five: {
          attack: 10,
          health: 100,
          x: null,
          y: null,
        }
      },
      level: 1,
      boss: {
        health: 20000,
        attack: 50
      }
    };
  }

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

    return grid;
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
        if (grid[player.y][player.x - 1] === 1) {
          grid[player.y][player.x - 1] = 5;
          grid[player.y][player.x] = 1;
          player.x = player.x - 1;
          this.setState({
            gridArr: grid,
            player
          });
        } else if (grid[player.y][player.x - 1] === 2) {
          grid[player.y][player.x - 1] = 5;
          grid[player.y][player.x] = 1;
          player.x = player.x - 1;
          player.health += Math.floor((Math.random() * 15) + 8);
          this.setState({
            gridArr: grid,
            player
          });
        } else if (grid[player.y][player.x - 1] === 3) {
          let enemyNumber = '';
          for (let enemy in enemies) {
            if (enemies[enemy].x === player.x - 1 && enemies[enemy].y === player.y) {
              enemyNumber = enemy;
            }
          }
          enemies[enemyNumber].health -= Math.floor((Math.random() * player.attack * level * player.level) + 7);
          player.health -= Math.floor((Math.random() * enemies[enemyNumber].attack * level) + 2 * this.state.level);
          if (enemies[enemyNumber].health <= 0) {
            grid[player.y][player.x - 1] = 5;
            grid[player.y][player.x] = 1;
            player.x = player.x - 1;
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
          } else if (player.health <= 0) {
            for (let enemy in enemies) {
              enemies[enemy] = {
                health: 100,
                attack: 10,
                x: null,
                y: null,
              }
            }
            player.x = null;
            player.y = null;
            player.health = 100;
            player.attack = 5;
            player.xp = 0;
            player.level = 1;
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
        } else if (grid[player.y][player.x - 1] === 4) {
          for (let enemy in enemies) {
            enemies[enemy] = {
              health: 100,
              attack: 10,
              x: null,
              y: null,
            }
          }
          player.health += 50;
          this.setState({
            player,
            enemies,
            level: level + 1,
            gridArr: this.getEmptyGrid()
          });
          this.generateLevel();
        } else if (grid[player.y][player.x - 1] === 6) {
          player.attack += 10 * level;
          grid[player.y][player.x - 1] = 5;
          grid[player.y][player.x] = 1;
          player.x = player.x - 1;
          this.setState({
            gridArr: grid,
            player
          })
        } else if (grid[player.y][player.x - 1] === 7) {
          boss.health -= Math.floor((Math.random() * player.attack * level * player.level) + 7);
          player.health -= Math.floor((Math.random() * boss.attack) + 20);
          if (boss.health <= 0) {
            alert('you won');
            for (let enemy in enemies) {
              enemies[enemy] = {
                health: 100,
                attack: 10,
                x: null,
                y: null,
              }
            }
            player.x = null
            player.y = null
            player.health = 100
            player.attack = 5
            player.xp = 0
            player.level = 1

            this.setState({
              player,
              enemies,
              level: 1,
              gridArr: this.getEmptyGrid()
            });
            this.generateLevel();
          } else if (player.health <= 0) {
            alert('you lost');
            for (let enemy in enemies) {
              enemies[enemy] = {
                health: 100,
                attack: 10,
                x: null,
                y: null,
              }
            }
            player.x = null
            player.y = null
            player.health = 100
            player.attack = 5
            player.xp = 0
            player.level = 1
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
        }
        break;
      case 38:
        //move up
        if (grid[player.y - 1][player.x] === 1) {
          grid[player.y - 1][player.x] = 5;
          grid[player.y][player.x] = 1;
          player.y = player.y - 1;
          this.setState({
            gridArr: grid,
            player: player
          })
        } else if (grid[player.y - 1][player.x] === 2) {
          grid[player.y - 1][player.x] = 5;
          grid[player.y][player.x] = 1;
          player.y = player.y - 1;
          player.health += Math.floor((Math.random() * 15) + 8);
          this.setState({
            gridArr: grid,
            player: player
          });
        } else if (grid[player.y - 1][player.x] === 3) {
          let enemyNumber = '';
          for (let enemy in enemies) {
            if (enemies[enemy].x === player.x && enemies[enemy].y === player.y - 1) {
              enemyNumber = enemy;
            }
          }
          enemies[enemyNumber].health -= Math.floor((Math.random() * player.attack * level * player.level) + 7);
          player.health -= Math.floor((Math.random() * enemies[enemyNumber].attack * level) + 2 * this.state.level);
          if (enemies[enemyNumber].health <= 0) {
            grid[player.y - 1][player.x] = 5;
            grid[player.y][player.x] = 1;
            player.y = player.y - 1;
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
          } else if (player.health <= 0) {
            for (let enemy in enemies) {
              enemies[enemy] = {
                health: 100,
                attack: 10,
                x: null,
                y: null,
              }
            }
            player.x = null
            player.y = null
            player.health = 100
            player.attack = 5
            player.xp = 0
            player.level = 1
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
        } else if (grid[player.y - 1][player.x] === 4) {
          for (let enemy in enemies) {
            enemies[enemy] = {
              health: 100,
              attack: 10,
              x: null,
              y: null,
            }
          }
          player.health += 50;
          this.setState({
            player,
            enemies,
            level: level + 1,
            gridArr: this.getEmptyGrid()
          });
          this.generateLevel();
        } else if (grid[player.y - 1][player.x] === 6) {
          player.attack += 10 * level;
          grid[player.y - 1][player.x] = 5;
          grid[player.y][player.x] = 1;
          player.y = player.y - 1;
          this.setState({
            gridArr: grid,
            player
          })
        } else if (grid[player.y - 1][player.x] === 7) {
          boss.health -= Math.floor((Math.random() * player.attack * level * player.level) + 7);
          player.health -= Math.floor((Math.random() * boss.attack) + 20);
          if (boss.health <= 0) {
            alert('you won');
            for (let enemy in enemies) {
              enemies[enemy] = {
                health: 100,
                attack: 10,
                x: null,
                y: null,
              }
            }
            player.x = null
            player.y = null
            player.health = 100
            player.attack = 5
            player.xp = 0
            player.level = 1

            this.setState({
              player,
              enemies,
              level: 1,
              gridArr: this.getEmptyGrid()
            });
            this.generateLevel();
          } else if (player.health <= 0) {
            alert('you lost');
            for (let enemy in enemies) {
              enemies[enemy] = {
                health: 100,
                attack: 10,
                x: null,
                y: null,
              }
            }
            player.x = null
            player.y = null
            player.health = 100
            player.attack = 5
            player.xp = 0
            player.level = 1
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
        }
        break;
      case 39:
        //move right
        if (grid[player.y][player.x + 1] === 1) {
          grid[player.y][player.x + 1] = 5;
          grid[player.y][player.x] = 1;
          player.x = player.x + 1;
          this.setState({
            gridArr: grid,
            player: player
          })
        } else if (grid[player.y][player.x + 1] === 2) {
          grid[player.y][player.x + 1] = 5;
          grid[player.y][player.x] = 1;
          player.x = player.x + 1;
          player.health += Math.floor((Math.random() * 15) + 8);
          this.setState({
            gridArr: grid,
            player: player
          });
        } else if (grid[player.y][player.x + 1] === 3) {
          let enemyNumber = '';
          for (let enemy in enemies) {
            if (enemies[enemy].x === player.x + 1 && enemies[enemy].y === player.y) {
              enemyNumber = enemy;
            }
          }
          enemies[enemyNumber].health -= Math.floor((Math.random() * player.attack * level * player.level) + 7);
          player.health -= Math.floor((Math.random() * enemies[enemyNumber].attack * level) + 2 * this.state.level);
          if (enemies[enemyNumber].health <= 0) {
            grid[player.y][player.x + 1] = 5;
            grid[player.y][player.x] = 1;
            player.x = player.x + 1;
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
          } else if (player.health <= 0) {
            for (let enemy in enemies) {
              enemies[enemy] = {
                health: 100,
                attack: 10,
                x: null,
                y: null,
              }
            }
            player.x = null
            player.y = null
            player.health = 100
            player.attack = 5
            player.xp = 0
            player.level = 1
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
        } else if (grid[player.y][player.x + 1] === 4) {
          for (let enemy in enemies) {
            enemies[enemy] = {
              health: 100,
              attack: 10,
              x: null,
              y: null,
            }
          }
          player.health += 50;
          this.setState({
            player,
            enemies,
            level: level + 1,
            gridArr: this.getEmptyGrid()
          });
          this.generateLevel();
        } else if (grid[player.y][player.x + 1] === 6) {
          player.attack += 10 * level;
          grid[player.y][player.x + 1] = 5;
          grid[player.y][player.x] = 1;
          player.x = player.x + 1;
          this.setState({
            gridArr: grid,
            player
          })
        } else if (grid[player.y][player.x + 1] === 7) {
          boss.health -= Math.floor((Math.random() * player.attack * level * player.level) + 7);
          player.health -= Math.floor((Math.random() * boss.attack) + 20);
          if (boss.health <= 0) {
            alert('you won');
            for (let enemy in enemies) {
              enemies[enemy] = {
                health: 100,
                attack: 10,
                x: null,
                y: null,
              }
            }
            player.x = null
            player.y = null
            player.health = 100
            player.attack = 5
            player.xp = 0
            player.level = 1

            this.setState({
              player,
              enemies,
              level: 1,
              gridArr: this.getEmptyGrid()
            });
            this.generateLevel();
          } else if (player.health <= 0) {
            alert('you lost');
            for (let enemy in enemies) {
              enemies[enemy] = {
                health: 100,
                attack: 10,
                x: null,
                y: null,
              }
            }
            player.x = null
            player.y = null
            player.health = 100
            player.attack = 5
            player.xp = 0
            player.level = 1
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
        }
        break;
      case 40:
        //move down
        if (grid[player.y + 1][player.x] === 1) {
          grid[player.y + 1][player.x] = 5;
          grid[player.y][player.x] = 1;
          player.y = player.y + 1;
          this.setState({
            gridArr: grid,
            player: player
          })
        } else if (grid[player.y + 1][player.x] === 2) {
          grid[player.y + 1][player.x] = 5;
          grid[player.y][player.x] = 1;
          player.y = player.y + 1;
          player.health += Math.floor((Math.random() * 15) + 8);
          this.setState({
            gridArr: grid,
            player: player
          });
        } else if (grid[player.y + 1][player.x] === 3) {
          let enemyNumber = '';
          for (let enemy in enemies) {
            if (enemies[enemy].x === player.x && enemies[enemy].y === player.y + 1) {
              enemyNumber = enemy;
            }
          }
          enemies[enemyNumber].health -= Math.floor((Math.random() * player.attack * level * player.level) + 7);
          player.health -= Math.floor((Math.random() * enemies[enemyNumber].attack * level) + 2 * this.state.level);
          if (enemies[enemyNumber].health <= 0) {
            grid[player.y + 1][player.x] = 5;
            grid[player.y][player.x] = 1;
            player.y = player.y + 1;
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
          } else if (player.health <= 0) {
            for (let enemy in enemies) {
              enemies[enemy] = {
                health: 100,
                attack: 10,
                x: null,
                y: null,
              }
            }
            player.x = null
            player.y = null
            player.health = 100
            player.attack = 5
            player.xp = 0
            player.level = 1
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
        } else if (grid[player.y + 1][player.x] === 4) {
          for (let enemy in enemies) {
            enemies[enemy] = {
              health: 100,
              attack: 10,
              x: null,
              y: null,
            }
          }
          player.health += 50;
          this.setState({
            player,
            enemies,
            level: level + 1,
            gridArr: this.getEmptyGrid()
          });
          this.generateLevel();
        } else if (grid[player.y + 1][player.x] === 6) {
          player.attack += 10 * level;
          grid[player.y + 1][player.x] = 5;
          grid[player.y][player.x] = 1;
          player.y = player.y + 1;
          this.setState({
            gridArr: grid,
            player
          })
        } else if (grid[player.y + 1][player.x] === 7) {
          boss.health -= Math.floor((Math.random() * player.attack * level * player.level) + 7);
          player.health -= Math.floor((Math.random() * boss.attack) + 20);
          if (boss.health <= 0) {
            alert('you won');
            for (let enemy in enemies) {
              enemies[enemy] = {
                health: 100,
                attack: 10,
                x: null,
                y: null,
              }
            }
            player.x = null
            player.y = null
            player.health = 100
            player.attack = 5
            player.xp = 0
            player.level = 1

            this.setState({
              player,
              enemies,
              level: 1,
              gridArr: this.getEmptyGrid()
            });
            this.generateLevel();
          } else if (player.health <= 0) {
            alert('you lost');
            for (let enemy in enemies) {
              enemies[enemy] = {
                health: 100,
                attack: 10,
                x: null,
                y: null,
              }
            }
            player.x = null
            player.y = null
            player.health = 100
            player.attack = 5
            player.xp = 0
            player.level = 1
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
        }
        break;
      default: 
        return;
    }
  }
  generateLevel() {
    const grid = this.generateEntities();;
    this.setState({
      gridArr: grid,
    })
  }
  
  componentWillMount() {
    this.generateLevel();
    window.addEventListener('keyup', this.keyPress.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyPress.bind(this));
  }
  
  render(){
    console.log(this.state.player, this.state.boss)
    return (
      <div className="wrapper">
        <Display gridArr={this.state.gridArr} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
