#!/bin/bash

OUTPUT_FILENAME="./src/words.js"
echo "export const wordList = [" > $OUTPUT_FILENAME
while IFS= read -r line; do
    # Remove trailing whitespace and newlines, then add the word to array
    cleaned_line=$(echo "$line" | tr -d '\n\r')
    echo "  \"$cleaned_line\"," >> $OUTPUT_FILENAME
done < words.txt
echo "];" >> $OUTPUT_FILENAME
