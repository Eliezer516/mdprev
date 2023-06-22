import './style.css'
import 'highlight.js/styles/atom-one-dark.css'
import 'github-markdown-css'

import { CodeJar } from 'codejar'
import { withLineNumbers } from 'codejar/linenumbers.js'

import hljs from 'highlight.js/lib/core';
import markdown from 'highlight.js/lib/languages/markdown';
hljs.registerLanguage('markdown', markdown);

import Split from 'split.js'
Split(['.split-1', '.split-2'])

import * as showdown from 'showdown'

const editor = document.querySelector('.editor')

const highlight = editor => {
  editor.textContent = editor.textContent
  hljs.highlightElement(editor)
}

const jar = CodeJar(editor, withLineNumbers(highlight), {
	tab: ' '.repeat(2)
})

jar.onUpdate(code => {
	let converter = new showdown.Converter()
	let htmlConverter = converter.makeHtml(code)
	document.querySelector('#preview').innerHTML = htmlConverter
	localStorage.setItem("content", code);
})

document.addEventListener("DOMContentLoaded", () => {
	if(localStorage.getItem("content")) {
		const converter = new showdown.Converter()
		const htmlConverter = converter.makeHtml(localStorage.getItem("content"))
		document.querySelector('#preview').innerHTML = htmlConverter
		jar.updateCode(localStorage.getItem("content"))
	}
})

