import sys

path = '/Users/kvid/Desktop/Projects/Prarthana/user-web/src/components/Flowchart.jsx'
with open(path, 'r') as f:
    data = f.read()

# The error was: <g className="fc-node" onClick={() => scrollTo(\'sruti\')}>
# I need to replace \' with '
data = data.replace("\\'", "'")

with open(path, 'w') as f:
    f.write(data)

print('Replaced successfully')
