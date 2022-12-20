if (typeof browser === "undefined") {
    browser = chrome
}

let main = document.querySelector("main");

// default prompts for new users
const default_prompts = [
	{
		"title": "TEST",
		"text": "MYPROMPT",
		"id": generateUUID(),
		"date": getDate(),
		"time": getTime(),
	}
];

const keys_pressed = {
	"shift": false,
};

browser.storage.local.get({prompts: default_prompts}, function(result) {
	load_prompts(result.prompts);
});

function load_prompts(prompts)
{
	for (let n = prompts.length - 1; n > -1; n--) { // load in reverse order
		let template = document.querySelector('#prompt_template').content.cloneNode(true);
		let even = n % 2 === 0;
		
		let prompt = prompts[n];
		let id = prompt.id;
		
		template.querySelector('.date').innerHTML = prompt.date;
        template.querySelector('.time').innerHTML = prompt.time;
        let title_text = template.querySelector('.title-text');
		title_text.innerHTML = prompt.title;
        let prompt_text = template.querySelector('.prompt-text');
		prompt_text.innerHTML = prompt.text;
		let row = template.querySelector('.row');
		
		row.addEventListener('click', event => {
            const target = event.target;
			if (target.classList.contains('trash')){
                // TODO 
            }
			else if (target.classList.contains('edit-title-button')){
				toggle_prompt_title_editable(id, row);
			}
			else if (target.classList.contains('title-text')){
				toggle_prompt_title_editable(id, row);
			}
			else if (target.classList.contains('edit-prompt-button')){
				toggle_prompt_body_editable(id, row);
			}
			else if (target.classList.contains('prompt-text')){
				toggle_prompt_body_editable(id, row);
			}
			else {
				
			}
		});
		/*
		prompt_text.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				if(!keys_pressed['shift'])
				{
					toggle_prompt_body_editable(id, row);
				}
			}
		});
		*/
		main.appendChild(template);
	};
}

function delete_prompt(id)
{
	
}

function toggle_prompt_title_editable(id, element)
{
	//getObjectById(id, list)
}

function toggle_prompt_body_editable(id, element)
{
	let edit_icon = element.querySelector(".edit-prompt-button");
	let prompt_text = element.querySelector(".prompt-text");
	
	if(!prompt_text.querySelector("textarea"))
	{
		let textarea = document.createElement("textarea");
		prompt_text.innerHTML = "";
		prompt_text.appendChild(textarea);
		browser.storage.local.get({prompts: default_prompts}).then((result) => {
			let prompts = result.prompts;
			let prompt = getObjectById(id, prompts);
			textarea.value = prompt.text;
			// init
			autoExpandTextArea();
		});
		edit_icon.classList.remove("fa-pen-to-square");
		edit_icon.classList.add("fa-floppy-disk-pen");
		
		// automatically growing textarea 
		const autoExpandTextArea = function() {
			textarea.style.height = ""; /* Reset the height*/
			textarea.style.height = textarea.scrollHeight + "px";
		}
		textarea.oninput = autoExpandTextArea;
	}
	else 
	{
		let textarea = prompt_text.querySelector("textarea");
		let text = textarea.value;
		browser.storage.local.get({prompts: default_prompts}).then((result) => {
			let prompts = result.prompts;
			let prompt = getObjectById(id, prompts);
			if(!prompt)
			{
				console.warn(`toggle_prompt_body_editable: cannot find prompt of id ${id}.`);
			}
			prompt.text = text;
			browser.storage.local.set({prompts: prompts});
		});
		prompt_text.innerHTML = text;
		edit_icon.classList.add("fa-pen-to-square");
		edit_icon.classList.remove("fa-floppy-disk-pen");
	}
	/*
	if(prompt_text.contentEditable === "inherit")
	{
		browser.storage.local.get({prompts: default_prompts}).then((result) => {
			let prompts = result.prompts;
			let prompt = getObjectById(id, prompts);
			prompt_text.innerHTML = prompt.text;
		});			
		prompt_text.classList.add('editable')
		prompt_text.contentEditable = "true";
		prompt_text.focus();
		edit_icon.classList.remove("fa-pen-to-square");
		edit_icon.classList.add("fa-floppy-disk-pen");
	}
	else 
	{
		browser.storage.local.get({prompts: default_prompts}).then((result) => {
			let prompts = result.prompts;
			let prompt = getObjectById(id, prompts);
			if(!prompt)
			{
				console.warn(`toggle_prompt_body_editable: cannot find prompt of id ${id}.`);
			}
			prompt.text = prompt_text.innerText;
			browser.storage.local.set({prompts: prompts});
		});
		prompt_text.classList.remove('editable')
		prompt_text.contentEditable = "inherit";
		edit_icon.classList.add("fa-pen-to-square");
		edit_icon.classList.remove("fa-floppy-disk-pen");
	}
	*/
}

function new_empty_prompt()
{
	let prompt = {
		date: getDate(),
		time: getTime(),
		id: generateUUID(),
		title: "",
		text: "",
	};
	return prompt;
}

function use_prompt()
{
	
}

function handle_keydown(event)
{
	if(event.key === "Shift")
	{
		keys_pressed["Shift"] = true;
	}
}

function handle_keyup(event)
{
	if(event.key === "Shift")
	{
		keys_pressed["Shift"] = false;
	}
}

document.body.addEventListener("keydown", handle_keydown);

document.body.addEventListener("keyup", handle_keyup);