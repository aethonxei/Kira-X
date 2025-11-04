# Code developed by @gata_dios
# * When forking this repository, please keep credits to all original creators. ♥

#!/data/data/com.termux/files/usr/bin/bash
BOT_DIR="Kira-X"
BOT_REPO="https://github.com/aethonxei/$BOT_DIR"
DB_FILE="database.json"

GREEN='\033[32m'
BOLD='\033[1m'
RESET='\033[0m'

if [[ $(basename "$PWD") == "$BOT_DIR" ]]; then
    if [ -e "$DB_FILE" ]; then 
        echo -e "${BOLD}${GREEN}Moving \"$DB_FILE\" to \"$HOME\" and cloning repository \"$BOT_REPO\" into \"$HOME\"...${RESET}"
        mv "$HOME/$BOT_DIR/$DB_FILE" "$HOME" && cd && rm -rf "$HOME/$BOT_DIR" && git clone "$BOT_REPO" && cd "$HOME/$BOT_DIR" && yarn --ignore-scripts && npm install && cd
        if [ -e "$HOME/$DB_FILE" ]; then
            echo -e "${BOLD}${GREEN}Rescuing file \"$DB_FILE\" and moving it back to \"$BOT_DIR\".${RESET}"
            echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
            mv "$HOME/$DB_FILE" "$HOME/$BOT_DIR/" && cd "$BOT_DIR" && npm start
        else
            echo -e "${BOLD}${GREEN}\"$DB_FILE\" does not exist in \"$HOME\".${RESET}"
            echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
            cd "$BOT_DIR" && npm start
        fi
    else
        echo -e "${BOLD}${GREEN}\"$DB_FILE\" not found in \"$BOT_DIR\". Cloning repository \"$BOT_REPO\" into \"$HOME\"...${RESET}"
        cd && rm -rf "$HOME/$BOT_DIR" && git clone "$BOT_REPO" && cd "$HOME/$BOT_DIR" && yarn --ignore-scripts && npm install && cd
        if [ -e "$HOME/$DB_FILE" ]; then
            echo -e "${BOLD}${GREEN}Rescuing file \"$DB_FILE\" and moving it to \"$BOT_DIR\".${RESET}"
            echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
            mv "$HOME/$DB_FILE" "$HOME/$BOT_DIR/" && cd "$BOT_DIR" && npm start
        else
            echo -e "${BOLD}${GREEN}\"$DB_FILE\" does not exist in \"$HOME\".${RESET}"
            echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
            cd "$BOT_DIR" && npm start
        fi
    fi
else
    echo -e "${BOLD}${GREEN}Current location: \"$HOME\"${RESET}"
    cd "$HOME"
    if [ -e "$HOME/$BOT_DIR" ]; then
        echo -e "${BOLD}${GREEN}Navigating to \"$BOT_DIR\"...${RESET}"
        cd "$HOME/$BOT_DIR"
        if [ -e "$HOME/$BOT_DIR/$DB_FILE" ]; then
            echo -e "${BOLD}${GREEN}Moving \"$DB_FILE\" to \"$HOME\" and cloning \"$BOT_REPO\" into \"$HOME\"...${RESET}"
            mv "$HOME/$BOT_DIR/$DB_FILE" "$HOME" && cd && rm -rf "$BOT_DIR" && git clone "$BOT_REPO" && cd "$BOT_DIR" && yarn --ignore-scripts && npm install && cd
            if [ -e "$HOME/$DB_FILE" ]; then
                echo -e "${BOLD}${GREEN}Rescuing \"$DB_FILE\" and moving it to \"$BOT_DIR\".${RESET}"
                echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
                mv "$HOME/$DB_FILE" "$HOME/$BOT_DIR/" && cd "$BOT_DIR" && npm start
            else
                echo -e "${BOLD}${GREEN}Navigating to \"$BOT_DIR\"...${RESET}"
                echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
                cd "$BOT_DIR" && npm start
            fi
        else
            echo -e "${BOLD}${GREEN}\"$DB_FILE\" does not exist. Cloning \"$BOT_REPO\" into \"$HOME\"...${RESET}"
            cd && rm -rf "$BOT_DIR" && git clone "$BOT_REPO" && cd "$BOT_DIR" && yarn --ignore-scripts && npm install &&
            echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
            npm start
        fi
    else
        echo -e "${BOLD}${GREEN}\"$BOT_DIR\" does not exist. Cloning \"$BOT_REPO\" into \"$HOME\"...${RESET}"
        git clone "$BOT_REPO" && cd "$BOT_DIR" && yarn --ignore-scripts && npm install && cd
        if [ -e "$HOME/$DB_FILE" ]; then
            echo -e "${BOLD}${GREEN}Found \"$DB_FILE\" in \"$HOME\", moving it to \"$BOT_DIR\".${RESET}"
            echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
            mv "$HOME/$DB_FILE" "$HOME/$BOT_DIR/" && cd "$BOT_DIR" && npm start
        else
            cd "$BOT_DIR" &&
            echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
            npm start
        fi
    fi
fi
