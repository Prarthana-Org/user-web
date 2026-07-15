import re
import os

html_file = "/Users/kvid/Desktop/Projects/Prarthana/canon_tree_flowchart.html"
with open(html_file, "r") as f:
    content = f.read()

# Extract styles
style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
styles = style_match.group(1) if style_match else ''
# prefix body styles to .flowchart-container to scope them
styles = styles.replace('body{', '.flowchart-container{')

# Extract body
body_match = re.search(r'<body>(.*?)</body>', content, re.DOTALL)
body = body_match.group(1) if body_match else ''

# Replace class with className
body = body.replace('class="', 'className="')

# Replace inline styles with objects
def style_to_object(match):
    style_str = match.group(1)
    # very basic: 'color:var(--gold);font-weight:600'
    parts = style_str.split(';')
    obj_str = "{"
    for part in parts:
        if ':' not in part: continue
        k, v = part.split(':', 1)
        k = k.strip()
        v = v.strip()
        # kebab case to camelCase
        k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
        # quote value if it has var or is not a simple number
        obj_str += f"'{k}': '{v}', "
    obj_str += "}"
    return f"style={{{obj_str}}}"

body = re.sub(r'style="(.*?)"', style_to_object, body)

# some other fixes for JSX
body = body.replace('<!--', '{/*').replace('-->', '*/}')
# close unclosed tags like <path ...> if they don't have />
body = re.sub(r'(<path[^>]+)(?<!/)>', r'\1 />', body)
body = re.sub(r'(<rect[^>]+)(?<!/)>', r'\1 />', body)

# close <br>
body = body.replace('<br>', '<br />')
# close <hr>
body = body.replace('<hr>', '<hr />')

jsx_content = f"""import React from 'react';

const Flowchart = () => {{
    return (
        <div className="pt-24 pb-16 min-h-screen content-center flowchart-container">
            <style dangerouslySetInnerHTML={{{{__html: `{styles}`}}}} />
            {body}
        </div>
    );
}};

export default Flowchart;
"""

with open("/Users/kvid/Desktop/Projects/Prarthana/user-web/src/components/Flowchart.jsx", "w") as f:
    f.write(jsx_content)

print("Flowchart.jsx created.")
