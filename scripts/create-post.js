const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

function getLastPostDate() {
    try {
        const postsDir = path.join(__dirname, '..', 'posts');
        const files = fs.readdirSync(postsDir);
        
        // Filter for markdown files and sort by name (newest first)
        const markdownFiles = files
            .filter(file => file.endsWith('.md'))
            .sort()
            .reverse();
        
        if (markdownFiles.length === 0) {
            return null;
        }
        
        // Get the most recent file
        const lastPostFile = markdownFiles[0];
        const filePath = path.join(postsDir, lastPostFile);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Extract date from frontmatter
        const dateMatch = content.match(/date:\s*"(\d{2}-\d{2}-\d{4})"/);
        if (dateMatch) {
            return dateMatch[1];
        }
        
        return null;
    } catch (error) {
        console.error('Error getting last post date:', error);
        return null;
    }
}

function executeGitCommand(command) {
    try {
        execSync(command, { stdio: 'inherit' });
        return true;
    } catch (error) {
        console.error(`Error executing git command: ${command}`);
        console.error(error.message);
        return false;
    }
}

async function gitOperations(fileName) {

    if (!executeGitCommand('git pull')) {
        console.log('Error pulling changes. Continuing with commit...');
    }
    
    if (!executeGitCommand(`git add posts/${fileName}`)) {
        console.log('Error adding file to staging.');
        return false;
    }
    
    if (!executeGitCommand(`git commit -m "feat: new post ${fileName}"`)) {
        console.log('Error creating commit.');
        return false;
    }
    
    console.log('\nPushing changes...');
    if (!executeGitCommand('git push')) {
        console.log('Error pushing changes.');
        return false;
    }
    
    return true;
}

function getUniqueFileName(baseFileName) {
    let counter = 1;
    let fileName = baseFileName;
    const postsDir = path.join(__dirname, '..', 'posts');
    
    while (fs.existsSync(path.join(postsDir, fileName))) {
        const nameWithoutExt = baseFileName.replace('.md', '');
        fileName = `${nameWithoutExt}${counter}.md`;
        counter++;
    }
    
    return fileName;
}

async function getContentType() {
    while (true) {
        console.log('\nSelect content type:');
        console.log('1. Markdown Text');
        console.log('2. Quote (title only, will be displayed in gray and not clickable)');
        console.log('3. YouTube Video');
        const choice = await question('Select an option (1-3): ');
        
        if (['1', '2', '3'].includes(choice)) {
            return choice;
        }
        console.log('Invalid option. Please select 1, 2, or 3.');
    }
}

async function getMarkdownContent() {
    console.log('\nWrite your content in Markdown (press Enter twice to finish):');
    let content = '';
    let emptyLines = 0;
    
    while (emptyLines < 2) {
        const line = await question('');
        if (line === '') {
            emptyLines++;
        } else {
            emptyLines = 0;
        }
        content += line + '\n';
    }
    return content.trim();
}

async function getYouTubeContent() {
    const youtubeUrl = await question('YouTube URL: ');
    const videoId = youtubeUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    if (!videoId) {
        console.log('Invalid YouTube URL.');
        return '';
    }
    return `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`;
}

async function createPost() {
    try {
        const title = await question('Post title: ');
        let date;
        const lastPostDate = getLastPostDate();
        const datePrompt = lastPostDate 
            ? `Date (format DD-MM-YYYY) [Last post: ${lastPostDate}]: `
            : 'Date (format DD-MM-YYYY): ';
        
        while (true) {
            date = await question(datePrompt);
            if (/^\d{2}-\d{2}-\d{4}$/.test(date)) {
                break;
            }
            console.log('Invalid date format. Use DD-MM-YYYY');
        }
        
        let visible;
        while (true) {
            const visibleInput = (await question('Is post visible? (y/n): ')).toLowerCase();
            if (visibleInput === 'y' || visibleInput === 'n') {
                visible = visibleInput === 'y';
                break;
            }
            console.log('Please answer with "y" or "n"');
        }
        
        const contentType = await getContentType();
        let content = '';
        let isQuote = false;
        
        switch (contentType) {
            case '1':
                content = await getMarkdownContent();
                break;
            case '2':
                isQuote = true;
                content = '';
                break;
            case '3':
                content = await getYouTubeContent();
                break;
        }
        
        let postContent = `---
date: "${date}"
title: "${title}"
visible: ${visible}
quote: ${isQuote}
slug: "${date.split('-').reverse().join('')}"
---\n\n${content}`;
        
        const baseFileName = `${date.split('-').reverse().join('')}.md`;
        
        const fileName = getUniqueFileName(baseFileName);
        const filePath = path.join(__dirname, '..', 'posts', fileName);
        
        fs.writeFileSync(filePath, postContent);
        console.log(`\nPost created successfully!\nPath: ${filePath}`);
        
        const gitSuccess = await gitOperations(fileName);
        if (gitSuccess) {
            console.log('\nGit operations completed successfully!');
        } else {
            console.log('\nThere were some errors in Git operations. Please check manually.');
        }
        
    } catch (error) {
        console.error('Error creating post:', error);
    } finally {
        rl.close();
    }
}

createPost(); 