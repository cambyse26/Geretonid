const switchActions = (selector) => {
    const container = document.querySelector(selector);

    const buttons = container.querySelectorAll('.action-name');

    buttons.forEach((button) => {
        button.addEventListener('click', ($event) => {
            const active = $event.srcElement.classList.contains('active');
            const target = $event.srcElement.id;
            const panels = container.querySelectorAll(`.action-panel`);
            const activeBtn = container.querySelector('.action-name.active')

            if (!active) {
                activeBtn.classList.remove('active');
                panels.forEach(panel => {
                    panel.classList.contains('hidden') && panel.dataset.action === target ? panel.classList.remove('hidden') : panel.classList.add('hidden');
                });
                button.classList.add('active')
            }

        });
    });

}

switchActions('.api-auth')
switchActions('.api-user')
switchActions('.api-upload')
switchActions('.api-post')