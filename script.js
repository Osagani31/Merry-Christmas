// Configuration
const treeConfig = [
    { width: 40, height: 25, lights: 1, ornaments: 0 },
    { width: 70, height: 30, lights: 2, ornaments: 1 },
    { width: 100, height: 35, lights: 3, ornaments: 1 },
    { width: 130, height: 35, lights: 4, ornaments: 2 },
    { width: 160, height: 40, lights: 5, ornaments: 2 },
    { width: 190, height: 40, lights: 6, ornaments: 3 },
    { width: 220, height: 45, lights: 7, ornaments: 3 },
    { width: 250, height: 45, lights: 8, ornaments: 4 },
    { width: 280, height: 50, lights: 9, ornaments: 4 },
    { width: 310, height: 50, lights: 10, ornaments: 5 },
    { width: 340, height: 55, lights: 11, ornaments: 5 },
    { width: 370, height: 55, lights: 12, ornaments: 6 }
];

const delayBetweenRows = 180;
const lightColors = ['white', 'white', 'white', 'gold', 'blue', 'red'];
const ornamentColors = ['red', 'gold', 'silver'];

// Get elements
const treeContainer = document.getElementById('tree');
const star = document.getElementById('star');
const trunk = document.getElementById('trunk');
const message = document.getElementById('message');
const snowContainer = document.getElementById('snowContainer');

// Wrap tree and trunk in a container for layout
const container = document.querySelector('.container');
const treeWrapper = document.createElement('div');
treeWrapper.className = 'tree-wrapper';
container.insertBefore(treeWrapper, message);
treeWrapper.appendChild(star);
treeWrapper.appendChild(treeContainer);
treeWrapper.appendChild(trunk);

// Function to create realistic tree branch with foliage
function createTreeRow(config, index) {
    const row = document.createElement('div');
    row.className = 'tree-row';
    row.style.marginBottom = '-5px';
    
    // Create foliage (green triangle)
    const foliage = document.createElement('div');
    foliage.className = 'foliage';
    foliage.style.width = config.width + 'px';
    foliage.style.height = config.height + 'px';
    row.appendChild(foliage);
    
    // Add LED lights
    for (let i = 0; i < config.lights; i++) {
        const light = document.createElement('div');
        const colorClass = lightColors[Math.floor(Math.random() * lightColors.length)];
        light.className = `light ${colorClass}`;
        
        // Position lights randomly across the branch
        const leftPos = 10 + (Math.random() * 80);
        const topPos = 20 + (Math.random() * 60);
        light.style.left = leftPos + '%';
        light.style.top = topPos + '%';
        
        foliage.appendChild(light);
    }
    
    // Add ornaments
    for (let i = 0; i < config.ornaments; i++) {
        const ornament = document.createElement('div');
        const colorClass = ornamentColors[Math.floor(Math.random() * ornamentColors.length)];
        ornament.className = `ornament ${colorClass}`;
        
        // Position ornaments randomly
        const leftPos = 15 + (Math.random() * 70);
        const topPos = 30 + (Math.random() * 50);
        ornament.style.left = leftPos + '%';
        ornament.style.top = topPos + '%';
        ornament.style.animationDelay = (Math.random() * 2) + 's';
        
        foliage.appendChild(ornament);
    }
    
    return row;
}

// Function to build tree from bottom to top
function createTree() {
    const totalRows = treeConfig.length;
    
    // Build from bottom to top
    for (let i = totalRows - 1; i >= 0; i--) {
        setTimeout(() => {
            const row = createTreeRow(treeConfig[i], i);
            
            // Insert at the beginning to build from bottom up
            treeContainer.insertBefore(row, treeContainer.firstChild);
            
            // If this is the top row, trigger star animation
            if (i === 0) {
                setTimeout(() => {
                    star.classList.add('pop');
                    
                    // Show trunk
                    setTimeout(() => {
                        trunk.classList.add('show');
                        
                        // Show message
                        setTimeout(() => {
                            message.classList.add('show');
                            
                            // Start snowfall
                            startSnowfall();
                        }, 600);
                    }, 600);
                }, 400);
            }
        }, (totalRows - 1 - i) * delayBetweenRows);
    }
}

// Enhanced snowflake creation
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = ['❄', '❅', '❆'][Math.floor(Math.random() * 3)];
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.fontSize = (Math.random() * 12 + 10) + 'px';
    snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's';
    snowflake.style.animationDelay = Math.random() * 2 + 's';
    
    snowContainer.appendChild(snowflake);
    
    // Remove after animation
    setTimeout(() => {
        snowflake.remove();
    }, parseFloat(snowflake.style.animationDuration) * 1000);
}

// Start continuous snowfall
function startSnowfall() {
    // Initial burst
    for (let i = 0; i < 40; i++) {
        setTimeout(() => createSnowflake(), i * 80);
    }
    
    // Continuous snowfall
    setInterval(() => {
        createSnowflake();
    }, 200);
}

// Initialize
window.addEventListener('load', () => {
    setTimeout(() => {
        createTree();
    }, 300);
});
