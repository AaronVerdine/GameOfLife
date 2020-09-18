# GameOfLife

For the first Build Week in the Compute Science module, we'll implement Cellular Autmata and Conway's "Game of Life"

# Turing Completeness

- the ability for a system of instructions to simulate a Turing machine
- A programming language that is Turing complete is theoretically capable of expressing all tasks accomplishable by computers
- nearly all programming languages are Turing complete if the limitations of finite memory are ignored

# Turing Machine

- is a mathematical model of computation tht defines an abstract machine, which manipulates symbols on a strip of tape according to a table of rules

# Rules of the Game

1. Any live cell with two or three live neighbors survives
2. Any dead cell with three live neighbors becomes a live cell
3. All other live cells die in the next generation. Similarly, all other dead cells stay dead

# Gameplan

1. Build grid to display cells
2. Cell components should include:
   - current state: (alive, dead), (black, white)
   - can be clicked to allow user to setuo initial cell config
   - NOT clickable when sim is running
   - toggle state functionality
3. Build data structure that holds grid of cells at least 25x25
4. Text displaying current generation #
   - a timeout function that builds the next gen of cells & update the display
5. Start & stop buttons
6. Clear button
7. Write an algorithm that:
   - Examines the state of all 8 neighboring cells
   - Apply rules to determine if cell will change states
   - When main loop completes:
     - swap grids
     - Repeat until simulation stopped
8. Break down steps into helper functions
9. Use double buffering to update grid
10. Either wrap edges around OR assume all edges are permanently dead

# Custom Features (implement at least 3)

- Sample cell configs
- Random cell config option
- Additonal cell properties (color, size, etc)
- Allow users to specify speed of sim
- Manual sim functionality
- Change grid dimension
- Skip ahead n generations
