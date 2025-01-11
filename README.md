# pamokos.skafis.lt

More info soon...

Very similar stuff to https://github.com/skafis-edtech/testai

## Database structure

```json
{
  "users": {
    "id1": {
      "role": "STUDENT"
    },
    "id2": {
      "role": "TEACHER"
    }
  },
  "groups": {
    "sdfsdfsdf": {
      "name": "12G",
      "teacherId": "kiukun",
      "studentIds": ["student1", "Student2"]
    }
  },
  "lessons": {
    "id1": {
      "title": "Išvestinės pradmenys, logaritmai",
      "groupId": "sdfsdfsdf",
      "date": "2024-07-02",
      "content": "miro.com/kajnkjnkjn",
      "recording": "drive.google.com/loinjkoijknju",
      "meetingLink": "teams.microsoft.com/asdasdsdfsdf",
      "participated": ["student1"],
      "onlyUseContent": ["student2"]
    }
  }
}
```
