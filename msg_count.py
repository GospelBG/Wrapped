import tkinter as tk
from tkinter import filedialog

root = tk.Tk()
root.withdraw()  # Hide the main window.

file_path = filedialog.askopenfilename()  # Open the file select dialog.

print(file_path)  # Print the selected file path.

file = open(file_path, 'r', errors='ignore')  # Open the file in read mode.
lines = file.readlines()  # Read all the lines in the file.

print("Total messages: " + str(len(lines)))  # Print the total number of messages.