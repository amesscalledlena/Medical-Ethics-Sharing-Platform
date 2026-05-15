from django.db import migrations


CATEGORY_NAMES = [
    "Films",
    "Theatre Plays",
    "Literary Texts",
    "Clinical Ethics Cases",
    "Ethics News",
]


def seed_categories(apps, schema_editor):
    Category = apps.get_model("blog", "Category")
    for name in CATEGORY_NAMES:
        Category.objects.get_or_create(name=name)


def unseed_categories(apps, schema_editor):
    Category = apps.get_model("blog", "Category")
    Category.objects.filter(name__in=CATEGORY_NAMES).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("blog", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_categories, unseed_categories),
    ]
