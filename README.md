# BranchWorks

## Overview

Welcome to the BranchWorks, a web application designed to help you manage your organization through a intuitivedesigned tree interface. Each employee is displayed as a card showing specific data such as name, job title, salary, and more. Additionally, it displays recursively computed values including the total cost (sum of all salaries of subordinates), number of children, total number of descendants, and other key metrics.

![Demo GIF](./orgtree.gif)

## Features

### Tree Interface

- **Zooming and Panning**: Navigate the organizational tree with ease.
- **Expandable Nodes**: Expand individual cards to view subordinates and automatically collapse nodes when a card on the same level is expanded.
- **Subtree Views**: Create simultaneous subtree views within the app, allowing for better management and organization.
- **Insert and Remove Employees**: Add new employees and place them throughout the tree, or remove existing ones.
- **Auto Sync Subflows**: Automatically sync subflows to display the most current and up-to-date information across all flows.
- **Recursive Computation**: View calculated values such as the total cost of subordinates, number of children, and total number of descendants.

### Sidebar

The sidebar provides detailed information about the selected employee, including:
- **Contact Information**: Phone, email, and address.
- **Performance Metrics**: Overall performance rating and more.
- **Business Details**: Sector, project, department, and other relevant business information.
- **Current Hierarchy**: Displays the nodes that have been expanded for the current view.

### Advanced Features

- **Search Functionality**: Search for an employee and the tree will automatically expand the path and bring the employee into view.
- **Simultaneous Subflow Creation**: Create and manage multiple subflows within the application.
- **Auto Sync Subflows**: Ensure all subflows display the most current and up-to-date information.

## Usage

1. **Navigate the Tree**: Use the mouse to zoom and pan across the tree.
2. **View Employee Details**: Click on an employee card to see detailed information in the sidebar.
3. **Expand/Collapse Nodes**: Click on the expand/collapse icons to manage the visibility of subordinates.
4. **Search Employees**: Use the search bar to find and highlight employees within the tree.
5. **Manage Subflows**: Create, view, and remove subflows as needed.
6. **Add/Remove Employees**: Use the interface to add new employees or remove existing ones from the tree.

## Data Handling

To start, this current example uses a CSV sheet with 30,000 employees, which is imported into a PostgreSQL database. The app then fetches the data and recursively builds a tree structure that is rendered in the application.

