// Create firefly particles
function createParticles() {
    const nav = document.querySelector('#nav');
    const particles = [];
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Create 10 particles for each nav button
    nav.querySelectorAll('a').forEach(button => {
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Start from center of button
            const rect = button.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            
            // Add random movement properties
            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            
            // Add random animation delays for staggered appearance
            particle.style.animationDelay = `${Math.random() * 2}s`;
            
            // Add random speed and direction
            const angle = Math.random() * 360;
            const speed = 0.5 + Math.random() * 0.5; // 0.5 to 1.0 pixels per frame
            
            // Calculate movement vector
            const dx = Math.cos(angle * Math.PI / 180) * speed;
            const dy = Math.sin(angle * Math.PI / 180) * speed;
            
            // Add custom data attributes for movement
            particle.dataset.dx = dx;
            particle.dataset.dy = dy;
            
            // Add to body instead of button
            document.body.appendChild(particle);
            
            // Make sure the particle is visible
            particle.style.opacity = '1';
            particle.style.visibility = 'visible';
            
            particles.push(particle);
        }
    });

    // Update particle positions on animation frame
    function updateParticles() {
        particles.forEach(particle => {
            // Get current position
            const style = window.getComputedStyle(particle);
            const left = parseFloat(style.left);
            const top = parseFloat(style.top);
            
            // Get movement vector
            const dx = parseFloat(particle.dataset.dx);
            const dy = parseFloat(particle.dataset.dy);
            
            // Update position
            particle.style.left = `${left + dx}px`;
            particle.style.top = `${top + dy}px`;
            
            // Check if particle is out of viewport
            if (left < 0 || left > viewportWidth || top < 0 || top > viewportHeight) {
                // Reset to random button
                const button = nav.querySelectorAll('a')[Math.floor(Math.random() * nav.querySelectorAll('a').length)];
                const rect = button.getBoundingClientRect();
                particle.style.left = `${rect.left + rect.width / 2}px`;
                particle.style.top = `${rect.top + rect.height / 2}px`;
                
                // Reset movement vector
                const angle = Math.random() * 360;
                const speed = 0.5 + Math.random() * 0.5;
                particle.dataset.dx = Math.cos(angle * Math.PI / 180) * speed;
                particle.dataset.dy = Math.sin(angle * Math.PI / 180) * speed;
            }
        });
        
        // Request next frame
        requestAnimationFrame(updateParticles);
    }

    // Start updating particles
    requestAnimationFrame(updateParticles);

    // Update particle positions on window resize
    window.addEventListener('resize', () => {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
        
        // Reset all particles to visible
        particles.forEach(particle => {
            particle.style.opacity = '1';
            particle.style.visibility = 'visible';
        });
    });
}

// Initialize particles when the page loads
document.addEventListener('DOMContentLoaded', createParticles);
