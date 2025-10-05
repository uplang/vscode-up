# Makefile for UP VS Code Extension
.PHONY: help install compile watch test lint package clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	npm install

compile: ## Compile TypeScript
	npm run compile

watch: ## Watch and compile on changes
	npm run watch

test: ## Run tests
	npm run pretest
	npm test

lint: ## Run linter
	npm run lint

package: compile ## Package extension as VSIX
	npm run package

publish: package ## Publish to VS Code Marketplace
	npm run publish

clean: ## Clean build artifacts
	rm -rf out/
	rm -rf dist/
	rm -f *.vsix

dev: install compile ## Set up development environment
	@echo "Extension ready for development"
	@echo "Run 'code --extensionDevelopmentPath=.' to test"

.DEFAULT_GOAL := help

